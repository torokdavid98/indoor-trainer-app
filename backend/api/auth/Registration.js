const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const crypto = require('crypto');
const { APIError } = require('../../common/errors');

function generateRandomWord() {
    const randomBytes = crypto.randomBytes(3);
    return randomBytes.toString('hex');
}
function Registration({ models, client, services: { AuditLogService, EmailService } }) {
    return async function registration({ data: { name, email } }) {
        const foundUser = await models.Users.findOne({
            where: {
                email,
            },
        });
        if (foundUser) {
            throw new APIError('User already exists!');
        }

        const password = generateRandomWord();
        const newUser = await models.Users.create({
            role: 'user',
            name,
            email,
            password: await promisify(bcrypt.hash)(password, 10),
        });

        const token = crypto.randomBytes(16).toString('hex');
        await models.Pwresets.create({ user_id: newUser.id, token });

        // send email
        await EmailService.composeAndSendEmail(
            models,
            client,
            'invite',
            {
                userToken: token,
                name,
            },
            [newUser.email],
            'Confirm your registration',
            newUser.id
        );

        // audit log
        await AuditLogService.log(models, null, 'registration', {
            userId: newUser.id,
            role: newUser.role,
            name: newUser.name,
            email: newUser.email,
        });

        return {
            id: newUser.id,
            role: newUser.role,
            name: newUser.lastname,
            email: newUser.email,
            two_factor_secret: false,
        };
    };
}

module.exports = Registration;
