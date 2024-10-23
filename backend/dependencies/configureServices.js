const JWTService = require('../services/JWTService');
const TwoFactorService = require('../services/TwoFactorService');

function configureServices() {
    return {
        JWTService,
        TwoFactorService,
    };
}

module.exports = configureServices;
