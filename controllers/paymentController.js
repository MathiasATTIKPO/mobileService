const Joi = require('joi');
const paydunyaService = require('../services/paydunyaService');

// Validation des données d'entrée
const paymentSchema = Joi.object({
    amount: Joi.number().integer().positive().required().messages({
        'number.base': 'Amount must be a number',
        'number.integer': 'Amount must be an integer',
        'number.positive': 'Amount must be a positive integer',
    }),
    phone_number: Joi.string().pattern(/^\d{8,15}$/).required().messages({
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be between 8 and 15 digits',
    }),
    payment_mode: Joi.string().valid('tmoney', 'moov').required().messages({
        'any.only': 'Payment mode must be one of tmoney or moov',
    }),
});

// Fonction pour traiter le paiement
const processPayment = async (req, res) => {
    const { error } = paymentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const result = await paydunyaService.processInvoiceAndPayment(req.body);

    if (result.success) {
        return res.status(200).json({
            message: 'Paiement traité avec succès',
            data: result.data,
        });
    }

    return res.status(500).json({ error: result.error });
};

module.exports = { processPayment };