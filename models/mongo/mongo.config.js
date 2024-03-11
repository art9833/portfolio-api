const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://aakasht:P2sE2bgeQohe0LAO@cluster0.d39nh6v.mongodb.net/?retryWrites=true&w=majority&appName=portfolio",{
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      console.log('Mongo Connected');
    } catch (error) {
      console.log('Failed to connect Mongo');
      console.log(error);
    }
};

// Connect to MongoDB
connectDB();

module.exports = connectDB;
