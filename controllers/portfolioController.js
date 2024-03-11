const Portfolio = require('../models/mongo/portfolio');
const Trade = require('../models/mongo/trade');
const Stock = require('../models/mongo/stock');


// Create a portfolio
async function createPortfolio(req, res) {
    try {
      const { portfolioName, stocks } = req.body;
  
      // Check if portfolio name already exists
      const existingPortfolio = await Portfolio.findOne({ name: portfolioName });
  
      if (existingPortfolio) {
        return res.status(400).json({ error: 'Portfolio name already exists' });
      }
  
      // Convert stock names to ObjectId references
      const stockIds = [];
      for (const id of stocks) {
        const stock = await Stock.findById(id);
        if (!stock) {
          return res.status(400).json({ error: `Stock not found` });
        }
        stockIds.push(stock._id);
      }
  
      // Create new portfolio
      const newPortfolio = new Portfolio({ name: portfolioName, stocks: stockIds });
      await newPortfolio.save();
  
      res.status(201).json({ message: 'Portfolio created successfully', portfolio: newPortfolio });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Retrieve the portfolio
// Retrieve the portfolio
async function getPortfolio(req, res) {
  try {
      const portfolio = await Portfolio.find(); // Assuming there's only one portfolio in the database
      if (!portfolio) {
          return res.status(404).json({ error: 'Portfolio not found' });
      }
      res.status(200).json({ portfolio });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}
  // Get holdings in an aggregate view
  async function getHoldings(req, res) {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const trades = await Trade.find({ stock: { $in: portfolio.stocks }, type: 'buy' });

        // Calculate average buying price
        let totalQuantity = 0;
        let totalPrice = 0;
        for (const trade of trades) {
            totalQuantity += trade.quantity;
            totalPrice += trade.price * trade.quantity;
        }
        const averageBuyingPrice = totalQuantity > 0 ? totalPrice / totalQuantity : 0;

        // Calculate cumulative return
        const initialPrice = trades.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
        const finalPrice = 100; // Assuming final price is 100
        const cumulativeReturn = finalPrice - initialPrice;

        res.status(200).json({ averageBuyingPrice, cumulativeReturn });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
  
  // Add a trade
  async function addTrade(req, res) {
    try {
        const { stock, quantity, price, type, date } = req.body;

        // Create a new Trade object
        const newTrade = new Trade({
            stock,
            quantity,
            price,
            type,
            date
        });

        // Save the new trade to the database
        await newTrade.save();

        res.status(201).json({ success: 'Trade added successfully',message: 'Trade added successfully', trade: newTrade });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }
  
  // Remove a trade
async function removeTrade(req, res) {
  try {
      const { id } = req.body;
      const trade = await Trade.findByIdAndDelete(id);
      if (!trade) {
          return res.status(404).json({ error: 'Trade not found' });
      }
      res.status(200).json({ message: 'Trade deleted successfully' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}
  
  // Update a trade in the portfolio
  async function updateTrade(req, res) {
    try {
      const  id  = req.body.tradeId;
      const updateData = req.body.update;

      // Check if the trade exists
      const trade = await Trade.findById(id);
      if (!trade) {
          return res.status(404).json({ error: 'Trade not found' });
      }

      // Update trade properties
      for (let key in updateData) {
          trade[key] = updateData[key];
      }

      // Save the updated trade
      await trade.save();

      res.status(200).json({ message: 'Trade updated successfully', trade });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
  }
  
  module.exports = {
    createPortfolio,
    getPortfolio,
    getHoldings,
    addTrade,
    removeTrade,
    updateTrade,
  };