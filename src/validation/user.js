import Joi from 'joi';

export const getDailyRateSchema = Joi.object({
  currentWeight: Joi.number().integer().min(30).max(300).required(),
  height: Joi.number().integer().min(100).max(220).required(),
  age: Joi.number().integer().min(18).max(100).required(),
  desiredWeight: Joi.number().integer().min(30).max(300).required(),
});
