const ApiKeyAuth = require('../middleware/auth/ApiKeyAuth');

function configureMiddleware({ models, services }) {
    const apiKeyAuth = ApiKeyAuth({ models, services });
    return {
        apiKeyAuth,
    };
}

module.exports = configureMiddleware;
