const Market = require('../models/Market');

const createMarket = async (req, res) => {
    try {
        const market = await Market.create(req.body);
        res.status(201).json(market);
    } catch (error) {
        res.status(400).json({ error: "Failed to create market" });
    }
};

const getAllMarkets = async (req, res) => {
    try {
        const markets = await Market.find();
        res.status(200).json(markets);
    } catch (error) {
        res.status(400).json({ error: "Failed to retrieve markets" });
    }
};

const getMarketById = async (req, res) => {
    try {
        const market = await Market.findById(req.params.id);
        if (!market) {
            return res.status(404).json({ error: "Market not found" });
        }
        res.status(200).json(market);
    } catch (error) {
        res.status(400).json({ error: "Failed to retrieve market" });
    }
};

const updateMarket = async (req, res) => {
    try {
        const market = await Market.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!market) {
            return res.status(404).json({ error: "Market not found" });
        }
        res.status(200).json(market);
    } catch (error) {
        res.status(400).json({ error: "Failed to update market" });
    }
};

const deleteMarket = async (req, res) => {
    try {
        const market = await Market.findByIdAndDelete(req.params.id);
        if (!market) {
            return res.status(404).json({ error: "Market not found" });
        }
        res.status(200).json({ message: "Market deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete market" });
    }
};

module.exports = {
    createMarket,//c
    getAllMarkets,//r all
    getMarketById,// r by id
    updateMarket,//u
    deleteMarket//d
};