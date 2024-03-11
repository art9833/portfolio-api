const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;