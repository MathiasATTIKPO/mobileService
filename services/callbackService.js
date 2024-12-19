const axios = require('axios'); // Pour envoyer les données vers une autre API
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

exports.processCallback = async (data) => {
    try {
        console.log('Données reçues pour le traitement:', data);

        // Vérification des données
        if (!data || !data.data || !data.data.invoice) {
            throw new Error('Les données du callback sont incomplètes ou mal formatées.');
        }

        // Extraction des informations pertinentes
        const responsePayload = {
            token: data.data.invoice.token,
            total_amount: data.data.invoice.total_amount,
            status: data.data.status,
            customer: {
                name: data.data.customer.name,
                phone: data.data.customer.phone,
                email: data.data.customer.email,
            },
        };

        console.log('Payload préparé pour envoi:', responsePayload);

        // Simule l'envoi des données à une autre API (désactivé ici)
        // const apiResponse = await axios.post('https://example.com/target-api', responsePayload);

        // Émission d'un événement pour le callback
        eventEmitter.emit('callback', responsePayload);

        // return { success: true, data: apiResponse.data };
    } catch (error) {
        console.error('Erreur dans le service:', error.message);
        throw new Error('Traitement du callback échoué');
    }
};
