const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  stock: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // Adding default timestamps

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
