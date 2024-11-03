const JWTService = require('../services/JWTService');
const TwoFactorService = require('../services/TwoFactorService');
const AuditLogService = require('../services/AuditLogService');

function configureServices() {
    return {
        JWTService,
        TwoFactorService,
        AuditLogService,
    };
}

module.exports = configureServices;
