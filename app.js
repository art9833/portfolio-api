require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./models/mongo/mongo.config');
const portfolioRoutes = require('./routes/portfolioRoutes');
const PORT = process.env.PORT || 3000;
const app = express();


// Middleware
app.use(bodyParser.json());
app.use(express.json({
    limit: '50mb',
    type: ['application/json', 'text/*'],
    verify: (req, res, buf) => {
      try {
        req.rawBody = JSON.stringify(JSON.parse(buf.toString()));
      } catch (error) {
        return res.status(400).json({ errorStack: error.stack });
      }
    }
  }));

// Routes
app.use('/portfolio', portfolioRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// catch 404 and forward to error handler
app.use(function (req, res) {
    return res.status(404).json({ error: 'Module Not Found' });
});
  
  //console.log("newrelic var",newrelic)
  // error handler
app.use(function (error, req, res) {
    res.status(500).json( { errorStack: error.stack });
  });
// Start the server


module.exports = app;