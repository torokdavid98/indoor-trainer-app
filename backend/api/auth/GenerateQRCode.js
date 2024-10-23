const { NotFoundError } = require('../../common/errors');
const config = require('../../config');

function GenerateQRCode({ models, services: { TwoFactorService } }) {
    return async function generateQRCode({ params: { userId } }) {
        const dbUser = await models.Users.findByPk(userId);
        if (!dbUser) {
            throw new NotFoundError('User not found!');
        }

        const { secret } = TwoFactorService.generateSecret();
        const qrCodeUrl = await TwoFactorService.generateQrCodeUrl(
            dbUser.email,
            config.twoFactorServiceName,
            secret
        )
            .then((imageUrl) => {
                return imageUrl;
            })
            .catch((err) => {
                console.log('Error with QR', err);
                return err;
            });

        return {
            qrCodeUrl,
            secret,
        };
    };
}

module.exports = GenerateQRCode;
