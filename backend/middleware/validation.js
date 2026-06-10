import Joi from 'joi';

export const validateCase = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(200).required(),
    description: Joi.string().max(2000),
    case_type: Joi.string().valid('Surveillance', 'Background Check', 'Fraud Investigation', 'Cyber Forensics', 'Missing Person', 'Corporate Espionage', 'Asset Tracing').required(),
    priority: Joi.string().valid('Low', 'Medium', 'High', 'Critical').default('Medium'),
    client_id: Joi.string().uuid().required(),
    budget_amount: Joi.number().positive().max(1000000),
    is_confidential: Joi.boolean().default(true)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details[0].message,
      code: 'VAL_001'
    });
  }
  next();
};

export const validateContact = (req, res, next) => {
  const schema = Joi.object({
    full_name: Joi.string()
      .pattern(/\S+\s+\S+/)
      .min(2)
      .max(100)
      .required()
      .messages({ 'string.pattern.base': 'Full name must include at least two names' }),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    subject: Joi.string().min(3).max(200).required(),
    message: Joi.string().min(10).max(5000).required(),
    is_urgent: Joi.boolean().default(false)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details[0].message,
      code: 'VAL_002'
    });
  }
  next();
};