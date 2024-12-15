require('dotenv').config();

module.exports = {
    publicKey: process.env.PAYDUNYA_PUBLIC_KEY,
    privateKey: process.env.PAYDUNYA_PRIVATE_KEY,
    token: process.env.PAYDUNYA_TOKEN,
    masterKey: process.env.PAYDUNYA_MASTER_KEY,
    port: process.env.PORT || 3000,
};