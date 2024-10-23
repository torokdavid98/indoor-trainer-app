const { authenticator } = require('otplib');

function generateQrCodeUrl(user, service, secret) {
    return new Promise((resolve, reject) => {
        const keyuri = authenticator.keyuri(user, service, secret);

        return resolve(keyuri);
        // moved to the frontend
        /*
        qrcode
            .toDataURL(otpauth)
            .then((imageUrl) => {
                resolve(imageUrl);
            })
            .catch((err) => {
                console.log('Error with QR', err);
                reject(err);
            }); 
        */
    });
}

module.exports.generateQrCodeUrl = generateQrCodeUrl;

function generateSecret() {
    const secret = authenticator.generateSecret();
    const token = authenticator.generate(secret);

    return {
        secret,
        token,
    };
}

module.exports.generateSecret = generateSecret;

function checkToken(token, secret) {
    let isValid = false;
    try {
        isValid = authenticator.check(token, secret);
    } catch (err) {
        console.error(err);
    }
    return isValid;
}

module.exports.checkToken = checkToken;
