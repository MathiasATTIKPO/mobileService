const express = require('express');
const { handleCallback } = require('../controllers/callBackController');

const router = express.Router();

// Route pour le callback
router.post('/callback', handleCallback);

module.exports = router;
