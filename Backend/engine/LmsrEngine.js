const marketCost = (q, b) => {
        const expSum = q.reduce((sum, qi) => sum + Math.exp(qi / b), 0)
        return b * Math.log(expSum)
    } //to calculate the total market cost 

const getCurrentCost = (q, outcomeIndex, b) => {
        const expI = Math.exp(q[outcomeIndex] / b)
        const expSum = q.reduce((sum, qi) => sum + Math.exp(qi / b), 0)
        return expI / expSum

    } // to get the current cost of one  share 
const getAllPrice = (q, b) => {
        const expSum = q.reduce((sum, qi) => sum + Math.exp(qi / b), 0)
        return q.map(qi => Math.exp(qi / b) / expSum)

    } // get all the prices of the stocks at once

const getBuyCost = (q, outcomeIndex, amount, b) => {
        const before = marketCost(q, b)
        const newq = [...q]
        newq[outcomeIndex] += amount
        return marketCost(newq, b) - before
    } // to get cost to buy certain no of shares for user



const getSellReturn = (q, outcomeIndex, amount, b) => {
        return -getBuyCost(q, outcomeIndex, -amount, b)
    } // to how much user is getting after selling the stocks



const totalHouseLoss = (b, numOutComes) => {
        return b * Math.log(numOutComes)

    } // how much money the house needs to reserve




module.exports = {
        marketCost,
        getAllPrice,
        getCurrentCost,
        getBuyCost,
        totalHouseLoss,
        getSellReturn

    }
    // This file contains the implementation of the LMSR (Logarithmic Market Scoring Rule) algorithm, which is used to calculate the cost of buying and selling shares in a prediction market. The functions provided allow for calculating the total market cost, the current cost of a share, the cost to buy shares, the return from selling shares, and the total house loss.