// routes/callbackRoutes.js
const express = require('express');
const router = express.Router();
const callbackController = require('../controllers/callbackController');

// Route pour le callback
router.post('/callback', callbackController.handleCallback);

module.exports = router;
