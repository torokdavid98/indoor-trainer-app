const sequelize = require('../models/sequelize');
const configureOperations = require('./configureOperations');

const configureModels = require('./configureModels');
const configureServices = require('./configureServices');
const configureMiddleware = require('./configureMiddleware');

const models = configureModels(sequelize);
const services = configureServices();
const operations = configureOperations({ models, services });
const middleware = configureMiddleware({ models, services });

module.exports = {
    models,
    operations,
    services,
    middleware,
};
