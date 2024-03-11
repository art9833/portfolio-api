const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Alphanumeric id
},{ timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
