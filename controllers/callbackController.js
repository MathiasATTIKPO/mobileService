const { processCallback } = require('../services/callbackService');

// const handleCallback = async (req, res) => {
//     try {
//         if (!req.body || !req.body.data) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Le corps de la requête est vide ou mal formaté',
//             });
//         }

//         console.log('Callback reçu :', req.body);

//         const result = await processCallback(req.body.data);

//         res.status(200).json({
//             status: 'success',
//             message: 'Données reçues et transférées avec succès',
//             data: result,
//         });
//     } catch (error) {
//         console.error('Erreur dans le contrôleur :', error.message);

//         res.status(500).json({
//             status: 'error',
//             message: error.message,
//         });
//     }
// };

const handleCallback = async (req, res) => {
    try {
        console.log('Callback reçu :', req.body);

        const result = await processCallback(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Données reçues et transférées avec succès',
            data: result,
        });
    } catch (error) {
        console.error('Erreur dans le contrôleur :', error.message);

        res.status(400).json({ // Retourne un statut 400 pour les erreurs de données
            status: 'error',
            message: error.message,
        });
    }
};

module.exports = { handleCallback };
    