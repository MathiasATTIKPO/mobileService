const axios = require('axios');
const config = require('../config/config');

// Fonction pour traiter le paiement
const processPayment = async (payload) => {
    try {
        let response;

        // Si le mode de paiement est T-Money
        if (payload.payment_mode === 'tmoney') {
            const tMoneyPayload = {
                name_t_money: payload.name,  // Nom de l'utilisateur
                email_t_money: payload.email,  // Email de l'utilisateur
                phone_t_money: payload.phone_number,  // Numéro de téléphone
                payment_token: config.token,  // Le token depuis .env
            };

            response = await axios.post('https://app.paydunya.com/api/v1/softpay/t-money-togo', tMoneyPayload, 
                {
                    headers: { 
                        'Content-Type': 'application/json'
                    }
                });
        }

        // Si le mode de paiement est Moov Togo
        if (payload.payment_mode === 'moov') {
            const moovPayload = {
                moov_togo_customer_fullname: payload.name,  // Nom de l'utilisateur
                moov_togo_email: payload.email,  // Email de l'utilisateur
                moov_togo_customer_address: payload.address,  // Adresse de l'utilisateur
                moov_togo_phone_number: payload.phone_number,  // Numéro de téléphone
                payment_token: config.token,  // Le token depuis .env
            };

            response = await axios.post('https://app.paydunya.com/api/v1/softpay/moov-togo', moovPayload, {
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
        }

        // Vérification de la réponse
        if (response && response.data && response.data.status === 'success') {
            return { success: true, data: response.data };
        }

        // Erreur dans la réponse, afficher le message détaillé
        return { success: false, error: response?.data?.message || 'Erreur lors du traitement du paiement' };

    } catch (error) {
        console.error('Erreur API PayDunya:', error.response ? error.response.data : error.message);
        return { 
            success: false, 
            error: error.response ? error.response.data.message || 'Erreur inconnue' : 'Erreur interne du serveur' 
        };
    }
};

module.exports = { processPayment };
