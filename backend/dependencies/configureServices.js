const JWTService = require('../services/JWTService');
const TwoFactorService = require('../services/TwoFactorService');
const AuditLogService = require('../services/AuditLogService');
const OpenAIService = require('../services/OpenAIService');
const EmailService = require('../services/EmailService');

function configureServices() {
    return {
        JWTService,
        TwoFactorService,
        AuditLogService,
        OpenAIService,
        EmailService,
    };
}

module.exports = configureServices;
