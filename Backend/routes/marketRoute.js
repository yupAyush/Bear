const express = require('express');
const router = express.Router();
const {
    createMarket,
    getAllMarkets,
    getMarketById,
    updateMarket,
    deleteMarket,

} = require('../controller/marketController');

router.post('/create', createMarket);
router.get('/getAllMarkets', getAllMarkets);
router.get('/:id', getMarketById);
router.put('/:id', updateMarket);
router.delete('/:id', deleteMarket);
router.post("/buy", require("../controller/buysellController"))
    // router.post("/sell", sell)

module.exports = router;