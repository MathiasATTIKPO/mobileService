const express = require('express');
const { processPayment } = require('../controllers/paymentController');

const router = express.Router();

// Route de traitement du paiement
router.post('/process-payment', processPayment);

module.exports = router;