const Market = require("../models/marketModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const {
    marketCost,
    getAllPrice,
    getCurrentCost,
    getBuyCost,
    totalHouseLoss,
    getSellReturn,
} = require("../engine/LmsrEngine");

const buy = async(req, res) => {
    const { marketId, amount, outcome, id } = req.body;
    if (!marketId || !amount || !outcome || !id) {
        res.status(400).send("Bad request");
    }
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const market = await Market.findById(marketId).session(session);
            const user = await User.findById(id).session(session);
            if (!market) {
                throw new Error("Market not found")
            }
            if (!user) {
                throw new Error("User not found")
            }
            if (!market.status === "active") {
                throw new Error("Market is not open for trading")

            }
            if (!market.outcomes.includes(outcome)) {
                throw new Error("invalid outcomes")


            }
            if (amount <= 0) {
                throw new Error("amount should be more than zero")
            }
            const cost = getBuyCost(market.q, market.outcomes.indexOf(outcome), amount, market.b)
            if (user.balance < cost) {
                throw new Error("Insuffcient user balance")
            }
            const newQ = [...market.q]
            newQ[market.outcomes.indexOf(outcome)] += amount
            market.q = newQ
            await market.save({ session })
            user.balance -= cost
            await user.save({ session })
            await session.commitTransaction()

            const newPrices = getAllPrice(market.q, market.b)
            const payload = newPrices.map((outcome, i) => ({

                outcome: outcome,
                price: newPrices[i],
                percent: (newPrices[i] * 100).toFixed(1)



            }))



            res.status(200).send({
                cost: cost.toFixed(2),
                shares: amount,
                newPrices: payload,
                newBalance: user.balance



            })





        } catch (error) {
            await session.abortTransaction()
            res.status(400).json({ error: error.message })
        } finally {
            session.endSession()
        }

    } catch (error) {}
};


module.exports = buy