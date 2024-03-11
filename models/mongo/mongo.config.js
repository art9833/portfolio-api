const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
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
