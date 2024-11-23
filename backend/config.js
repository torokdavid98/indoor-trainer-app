const { parseEnvNumber } = require('./common/utils');

module.exports.db = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: parseEnvNumber('DB_PORT', 3306),
    maxConnection:
        typeof process.env.DB_MAXCONNECTION === 'undefined'
            ? 5
            : parseInt(process.env.DB_MAXCONNECTION, 10),
    compress: typeof process.env.DB_COMPRESS !== 'undefined',
};

module.exports.port = parseEnvNumber('PORT', 3000);

module.exports.isProd = process.env.NODE_ENV === 'production';

module.exports.jwt = {
    secret: process.env.JWT_SECRET || 'supersecrett',
};

module.exports.url = {
    siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:4000',
};

module.exports.openAI = {
    privateKey: process.env.OPENAI_PRIVATE_KEY,
};

module.exports.twoFactorServiceName = 'Indoor Trainer App';
module.exports.twoFactorEnabled = process.env.TWO_FACTOR_ENABLED === '1';

module.exports.nodemail = {
    /**
     * SMTP username
     * @type {String}
     */
    nodemailUser: process.env.SMTP_USERNAME,
    /**
     * SMTP password
     * @type {String}
     */
    nodemailPass: process.env.SMTP_PASSWORD,

    /**
     * SMTP host
     * @type {String}
     */
    nodemailHost: process.env.NODEMAIL_HOST,

    /**
     * SMTP sender mail
     */
    nodemailSender: process.env.NODEMAIL_SENDER,
    nodemailSenderName: process.env.NODEMAIL_SENDER_NAME,
};
