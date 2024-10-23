const bcrypt = require('bcryptjs');
const { Unauthorized } = require('http-errors');
const { authenticator } = require('otplib');
const { ConflictError, UnauthorizedError, APIErrorWithJson } = require('../../common/errors');
const config = require('../../config');

// TODO: false for now
async function isTwoFactorEnabled(user) {
    let twoFactorEnabled = false;
    return twoFactorEnabled;
}

function Login({ models, services: { JWTService, TwoFactorService } }) {
    return async function login({ data: { email, password, oneTimePassword, secret } }) {
        const user = await models.Users.findOne({
            where: {
                email,
            },
        });

        // no user or wrong password
        if (!user || (await bcrypt.compare(password, user.password)) === false) {
            throw new Unauthorized('Incorrect email or password!');
        }

        const isTwoFactor = await isTwoFactorEnabled(user);

        if (isTwoFactor) {
            // separate two cases
            // 1. user does not have two factor secret (QR code)
            // 2. user has two factor secret (one time password)
            if (user.two_factor_secret === null) {
                // save secret to user from login flow
                if (secret && oneTimePassword) {
                    const token = authenticator.generate(secret);
                    if (token !== oneTimePassword) {
                        throw new UnauthorizedError('Invalid one time password!');
                    }

                    await user.update({
                        two_factor_secret: secret,
                    });
                } else {
                    // generate qr code url
                    const { secret: generatedSecret } = await TwoFactorService.generateSecret();
                    const qrCodeUrl = await TwoFactorService.generateQrCodeUrl(
                        user.email,
                        config.twoFactorServiceName,
                        generatedSecret
                    );
                    throw new APIErrorWithJson('Two factor authentication is required!', 500, {
                        userId: user.id,
                        secret: generatedSecret,
                        qrCodeUrl,
                    });
                }
            } else if (!oneTimePassword) {
                throw new ConflictError('Two factor authentication is required!');
            }
        }

        // check oneTimePassword
        if (isTwoFactor && oneTimePassword) {
            const isValid = await TwoFactorService.checkToken(
                oneTimePassword,
                user.two_factor_secret
            );
            if (!isValid) {
                console.log('invalid one time password');
                throw new UnauthorizedError('Invalid one time password!');
            }
        }

        const token = await JWTService.generateToken({
            id: user.id,
            role: user.role,
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile_picture: user.profile_picture,
                token,
                two_factor_enabled: isTwoFactor,
            },
        };
    };
}

module.exports = Login;
