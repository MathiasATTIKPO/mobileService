// Endpoint callback pour recevoir les données JSON
app.post('/callback', async (req, res) => {
    console.log('Callback reçu :', req.body);

    // Vérifier si la structure "data" est présente
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({
            status: 'error',
            message: 'Structure JSON invalide : "data" manquante',
        });
    }

    // Extraction de données spécifiques du fichier JSON
    const responseCode = data.response_code;
    const responseText = data.response_text;
    const totalAmount = data.invoice?.total_amount || 0;
    const customerName = data.customer?.name || 'Inconnu';

    // Liste des items achetés
    const items = data.invoice?.items || {};
    const itemDetails = Object.values(items).map((item) => ({
        name: item.name,
        quantity: item.quantity,
        total_price: item.total_price,
    }));

    // Construire le payload à envoyer à une autre API
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

    console.log('Données à envoyer :', payload);

    // try {
    //     // Envoyer les données à une autre API
    //     const apiResponse = await axios.post('https://example.com/endpoint', payload, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });

    //     console.log('Réponse de l\'autre API :', apiResponse.data);

    //     // Répondre à l'appel initial
    //     res.status(200).json({
    //         status: 'success',
    //         message: 'Données reçues et transférées avec succès',
    //     });
    // } catch (error) {
    //     console.error('Erreur lors de l\'envoi à l\'autre API :', error.message);

    //     res.status(500).json({
    //         status: 'error',
    //         message: 'Erreur lors de l\'envoi des données à l\'autre API',
    //     });
    // }
});