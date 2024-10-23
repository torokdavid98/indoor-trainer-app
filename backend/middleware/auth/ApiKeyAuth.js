const { TokenExpiredError } = require('jsonwebtoken');
const { UnauthorizedError } = require('../../common/errors');

function ApiKeyAuth({ models, services: { JWTService } }) {
    return async function apiKeyAuth(req) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedError('No authorization header found');
        }
        const [format, token] = authHeader.split(' ');

        if (!format || format !== 'Bearer' || !token) {
            throw new UnauthorizedError('Authorization header should be in Bearer format');
        }

        let payload = null;

        try {
            payload = await JWTService.decodeToken(token);
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                throw new UnauthorizedError('Session expired. Please Login.');
            }
            console.log(e);
            throw new UnauthorizedError('Invalid jwt token');
        }

        const { id, role } = payload;
        let user = null;

        user = await models.Users.findByPk(id, { attributes: ['id', 'role'] });

        if (!user) {
            throw new UnauthorizedError('Unauthorized');
        }

        req.user = {
            id,
            role,
        };

        return true;
    };
}

module.exports = ApiKeyAuth;
