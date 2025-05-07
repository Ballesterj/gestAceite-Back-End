const Joi = require('joi');

const validatePostFinca = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      'string.min': 'The name must be at least 3 characters long.',
      'string.max': 'The name cannot exceed 50 characters.',
      'any.required': 'The name field is required.',
    }),
    surface: Joi.number().min(1).required().messages({
      'number.min': 'The surface must be at least 1.',
      'any.required': 'The surface field is required.',
    }),
    location: Joi.string().min(3).max(50).required().messages({
      'string.min': 'The location must be at least 3 characters long.',
      'string.max': 'The location cannot exceed 50 characters.',
      'any.required': 'The location field is required.',
    }),
    oliveAmount: Joi.number().min(1).required().messages({
      'number.min': 'The olive amount must be at least 1.',
      'any.required': 'The olive amount field is required.',
    }),
    owner: Joi.string()
      .hex()
      .length(24)
      .messages({
        'string.hex': 'The ID must contain only hexadecimal characters.',
        'string.length': 'The ID must be exactly 24 characters long.',
      }),
    harvests: Joi.array().items(
      Joi.object({
        year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required().messages({
          'number.min': 'Year must be at least 1900.',
          'number.max': 'Year cannot be greater than the current year.',
          'any.required': 'Year field is required.',
        }),
        olivesHarvestedKg: Joi.number().min(1).required().messages({
          'number.min': 'The olives harvested must be at least 1 kg.',
          'any.required': 'The olives harvested field is required.',
        }),
        oilYieldPercent: Joi.number().min(0).max(100).required().messages({
          'number.min': 'The oil yield percentage must be between 0 and 100.',
          'number.max': 'The oil yield percentage cannot exceed 100.',
          'any.required': 'The oil yield percentage field is required.',
        }),
      })
    ).optional().messages({
      'array.base': 'Harvests must be an array of harvest objects.',
      'any.required': 'Harvests field is required.',
    })
  });

  const validatePutFinca = Joi.object({
    name: Joi.string().min(3).max(50).messages({
      'string.min': 'The name must be at least 3 characters long.',
      'string.max': 'The name cannot exceed 50 characters.',
    }),
    surface: Joi.number().min(1).messages({
      'number.min': 'The surface must be at least 1.',
    }),
    location: Joi.string().min(3).max(50).messages({
      'string.min': 'The location must be at least 3 characters long.',
      'string.max': 'The location cannot exceed 50 characters.',
    }),
    oliveAmount: Joi.number().min(1).messages({
      'number.min': 'The olive amount must be at least 1.',
    }),
    owner: Joi.string().hex().length(24).messages({
      'string.hex': 'The ID must contain only hexadecimal characters.',
      'string.length': 'The ID must be exactly 24 characters long.',
    }),
    harvests: Joi.array()
      .items(
        Joi.object({
          _id: Joi.string().optional(), // Permitimos que _id sea opcional
          year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required().messages({
            'number.min': 'Year must be at least 1900.',
            'number.max': 'Year cannot be greater than the current year.',
            'any.required': 'Year field is required.',
          }),
          olivesHarvestedKg: Joi.number().min(1).required().messages({
            'number.min': 'The olives harvested must be at least 1 kg.',
            'any.required': 'The olives harvested field is required.',
          }),
          oilYieldPercent: Joi.number().min(0).max(100).required().messages({
            'number.min': 'The oil yield percentage must be between 0 and 100.',
            'number.max': 'The oil yield percentage cannot exceed 100.',
            'any.required': 'The oil yield percentage field is required.',
          }),
        })
      )
      .optional()
      .messages({
        'array.base': 'Harvests must be an array of harvest objects.',
        'any.required': 'Harvests field is required.',
      }),
  });

module.exports = {
    validatePostFinca,
    validatePutFinca,
};