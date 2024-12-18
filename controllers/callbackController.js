const { processCallback } = require('../services/callbackService');

const handleCallback = async (req, res) => {
    try {
        console.log('Callback reçu :', req.body);
    
        //const result = await processCallback(req.body.data);
    
        res.status(200).json({
            status: 'success',
            message: 'Données reçues et transférées avec succès',
            data: result,
        });
    } catch (error) {
        console.error('Erreur dans le contrôleur :', error.message);
    
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};
    
module.exports = { handleCallback };
    