const axios = require('axios');
const config = require('../config/config');

// Informations statiques
const STATIC_INFO = {
    description: 'Paiement d’un service mobile money',
    storeName: ' Service  Mobile Money',
    email : 'haekenterprise@gmail.com'

};

// Fonction pour générer une facture et exécuter le paiement
const processInvoiceAndPayment = async (payload) => {
    try {
        // Étape 1 : Générer la facture (avec des valeurs statiques)
        const invoicePayload = {
            invoice: {
                total_amount: payload.amount, // Montant provenant du client
                description: STATIC_INFO.description, // Description statique
            },
            store: {
                name: STATIC_INFO.storeName, // Nom du magasin statique
            },
        };

        const invoiceResponse = await axios.post(
            'https://app.paydunya.com/api/v1/checkout-invoice/create',
            invoicePayload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'PAYDUNYA-MASTER-KEY': config.masterKey,
                    'PAYDUNYA-PRIVATE-KEY': config.privateKey,
                    'PAYDUNYA-TOKEN': config.token,
                },
            }
        );

        if (invoiceResponse.data.response_code !== '00') {
            return { success: false, error: 'Erreur lors de la création de la facture' };
        }

        const invoiceToken = invoiceResponse.data.token;
        console.log("token:", invoiceToken);

        // Étape 2 : Effectuer le paiement en fonction du mode
        let paymentResponse;

        if (payload.payment_mode === 'tmoney') {
            const tMoneyPayload = {
                name_t_money: payload.name,
                email_t_money: STATIC_INFO.email,
                phone_t_money: payload.phone_number, // Numéro de téléphone fourni par le client
                payment_token: invoiceToken, // Le token de la facture
            };

            paymentResponse = await axios.post(
                'https://app.paydunya.com/api/v1/softpay/t-money-togo',
                tMoneyPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        } else if (payload.payment_mode === 'moov') {
            const moovPayload = {
                moov_togo_customer_fullname: payload.name,
                moov_togo_email: STATIC_INFO.email,
                moov_togo_customer_address: payload.address,
                moov_togo_phone_number: payload.phone_number, // Numéro de téléphone fourni par le client
                payment_token: invoiceToken, // Le token de la facture
            };

            paymentResponse = await axios.post(
                'https://app.paydunya.com/api/v1/softpay/moov-togo',
                moovPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
        console.log("Statut :", paymentResponse.data.success);
        
        if (paymentResponse.data.success === true ) {
            return { success: true, data: paymentResponse.data };  
            
        }else{
            return { success: false, error: 'Erreur lors de l’exécution du paiement' };
        }

    } catch (error) {
        console.error('Erreur API PayDunya:', error.response?.data || error.message);
        return { success: false, error: 'Erreur interne du serveur' };
    }
};

module.exports = { processInvoiceAndPayment };
