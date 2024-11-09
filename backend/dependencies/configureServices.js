const JWTService = require('../services/JWTService');
const TwoFactorService = require('../services/TwoFactorService');
const AuditLogService = require('../services/AuditLogService');
const OpenAIService = require('../services/OpenAIService');

function configureServices() {
    return {
        JWTService,
        TwoFactorService,
        AuditLogService,
        OpenAIService,
    };
}

module.exports = configureServices;
