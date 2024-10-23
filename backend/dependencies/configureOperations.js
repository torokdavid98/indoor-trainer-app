/**
 * @typedef {function({params: object, data: object, user: object, auth0User: object}): Promise<any>} Operation
 */

const Login = require('../api/auth/Login');
const GenerateQRCode = require('../api/auth/GenerateQRCode');
const SaveQRCode = require('../api/auth/SaveQRCode');

function configureOperations({ models, services }) {
    const login = Login({ models, services });
    const generateQRCode = GenerateQRCode({ models, services });
    const saveQRCode = SaveQRCode({ models });

    return {
        login,
        generateQRCode,
        saveQRCode,
    };
}

module.exports = configureOperations;
