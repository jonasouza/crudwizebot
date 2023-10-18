import Joi from "joi";

export const createUserValidationObjectSchema = Joi.object({
    apiToken: Joi.string().required(),
    nome: Joi.string().min(3).required(), 
    email: Joi.string().email().required(), 
    senha: Joi.string().min(3).required(), 
    fone: Joi.string().required(), 
    plano: Joi.string()
})

export const updateUserValidationObjectSchema = Joi.object({
    apiToken: Joi.string(),
    nome: Joi.string().min(3), 
    email: Joi.string().email(), 
    senha: Joi.string().min(3), 
    fone: Joi.string(), 
    plano: Joi.string()
})