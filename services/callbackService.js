const axios = require('axios');

const processCallbackData = async (data) => {
    // Vérification des données
    if (!data) {
        throw new Error('Structure JSON invalide : "data" manquante');
    }

    // Extraction des informations nécessaires
    const responseCode = data.response_code;
    const responseText = data.response_text;
    const totalAmount = data.invoice?.total_amount || 0;
    const customerName = data.customer?.name || 'Inconnu';

    // Détails des items
    const items = data.invoice?.items || {};
    const itemDetails = Object.values(items).map((item) => ({
        name: item.name,
        quantity: item.quantity,
        total_price: item.total_price,
    }));

    // Construire le payload
    const payload = {
        transaction: {
            responseCode,
            responseText,
            totalAmount,
        },
        customer: {
            name: customerName,
            
        },
        items: itemDetails,
        timestamp: new Date().toISOString(),
    };

    console.log('Payload construit :', payload);

    // Envoi des données à l'API externe
    // try {
    //     const apiResponse = await axios.post('https://example.com/endpoint', payload, {
    //         headers: { 'Content-Type': 'application/json' },
    //     });

    //     console.log('Réponse de l\'API externe :', apiResponse.data);
    //     return apiResponse.data;
    // } catch (error) {
    //     console.error('Erreur lors de l\'envoi à l\'API externe :', error.message);
    //     throw new Error('Erreur lors de l\'envoi des données à l\'API externe');
    // }
};

module.exports = {
    processCallbackData,
};
