const { authenticator } = require('otplib');
const { UnauthorizedError, NotFoundError } = require('../../common/errors');

function SaveQRCode({ models, services: { AuditLogService } }) {
    return async function saveQRCode({ user: { id }, data: { secret, oneTimePassword } }) {
        const dbUser = await models.Users.findByPk(id);

        if (!dbUser) {
            throw new NotFoundError('User not found!');
        }

        const token = authenticator.generate(secret);
        if (token !== oneTimePassword) {
            throw new UnauthorizedError('Invalid one time password!');
        }

        await dbUser.update({
            two_factor_secret: secret,
        });

        // audit log
        await AuditLogService.log(models, id, 'save_two_factor_auth', {
            userId: id,
            email: dbUser.email,
        });

        return {
            status: 'success',
        };
    };
}

module.exports = SaveQRCode;
