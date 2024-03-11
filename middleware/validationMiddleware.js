const Joi = require('joi');
const { authenticateToken } = require('./authMiddleware');

const addTradeSchema = Joi.object({
  stock: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  type: Joi.string().valid('buy', 'sell').required(),
  date: Joi.date().iso().optional()
});

const updateTradeSchema = Joi.object({
  tradeId: Joi.string().required(),
  update: Joi.object({
    quantity: Joi.number(),
    price: Joi.number(),
    date: Joi.date().iso().optional()
  })
  
});

const removeTradeSchema = Joi.object({
  tradeId: Joi.string().required()
});

const validateAddTrade = (req, res, next) => {
  const { error } = addTradeSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
};

const validateUpdateTrade = (req, res, next) => {
  const { error } = updateTradeSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
};

const validateRemoveTrade = (req, res, next) => {
  const { error } = removeTradeSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
};

module.exports = {
  authenticateToken,
  validateAddTrade,
  validateUpdateTrade,
  validateRemoveTrade
};
