const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const validationMiddleware = require('../middleware/validationMiddleware');


// GET /portfolio
router.get('/', portfolioController.getPortfolio);

router.post('/createportfolio', portfolioController.createPortfolio);

// GET /portfolio/holdings
router.get('/holdings', portfolioController.getHoldings);

// POST /portfolio/addTrade
router.post('/addTrade',validationMiddleware.validateAddTrade,portfolioController.addTrade);

// PUT /portfolio/updateTrade
router.post('/updateTrade',validationMiddleware.validateUpdateTrade,portfolioController.updateTrade);

// DELETE /portfolio/removeTrade
router.delete('/removeTrade',validationMiddleware.validateRemoveTrade,portfolioController.removeTrade);

module.exports = router;