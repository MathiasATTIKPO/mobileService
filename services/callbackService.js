// services/callbackService.js
const axios = require('axios'); // Pour envoyer les données vers une autre API

exports.processCallback = async (data) => {
    try {
        const invoice = data.data.invoice;

        // Extraire des informations pertinentes
        const responsePayload = {
            token: invoice.token,
            total_amount: invoice.total_amount,
            status: data.data.status,
            customer: {
                name: data.data.customer.name,
                phone: data.data.customer.phone,
                email: data.data.customer.email,
            },
        };

        console.log('Payload préparé pour envoi:', responsePayload);

        // Optionnel : Envoi des données à une autre API
        const apiResponse = await axios.post('https://example.com/target-api', responsePayload);

        return { success: true, data: apiResponse.data };
    } catch (error) {
        console.error('Erreur dans le service:', error.message);
        throw new Error('Traitement du callback échoué');
    }
};
