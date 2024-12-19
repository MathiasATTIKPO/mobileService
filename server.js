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


// Lancer le serveur
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`disponible à http://localhost:${PORT}`);
});