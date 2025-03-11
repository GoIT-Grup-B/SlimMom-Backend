import Joi from 'joi';

export const registerUserSchema = Joi.object({
    name: Joi.string().min(5).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
