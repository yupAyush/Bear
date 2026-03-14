const express = require('express');
const router = express.Router();
const {
  createMarket,
  getAllMarkets,
  getMarketById,
  updateMarket,
  deleteMarket,
} = require('../controllers/marketController');

router.post('/',        createMarket);
router.get('/',         getAllMarkets);
router.get('/:id',      getMarketById);
router.put('/:id',      updateMarket);
router.delete('/:id',   deleteMarket);

module.exports = router;