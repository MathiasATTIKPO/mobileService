const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
const callbackRoutes = require('./routes/callbackRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', paymentRoutes);
app.use('/api', callbackRoutes);

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`, { body: req.body });
    next();
});

// Serveur d'événements pour afficher les notifications en temps réel
app.get('/api/notifications', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const callbackListener = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    eventEmitter.on('callback', callbackListener);

    req.on('close', () => {
        eventEmitter.removeListener('callback', callbackListener);
    });
});



// Lancer le serveur
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`disponible à http://localhost:${PORT}`);
});