const express = require('express');
const router = express.Router();

router.post('/payment-notification', (req, res) => {
    const paymentData = req.body;

    console.log('Notification reçue :', paymentData);

    // Traitement ou stockage des données
    if (paymentData.status === 'CONFIRMED') {
        res.status(200).json({ message: 'Paiement confirmé', data: paymentData });
    } else {
        res.status(200).json({ message: 'Notification reçue, paiement en attente', data: paymentData });
    }
});

module.exports = router;
