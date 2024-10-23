const Users = require('../models/Users');

function configureModels(sequelize) {
    Users.init(sequelize);

    const { models } = sequelize;

    for (const modelName of Object.keys(models)) {
        sequelize.models[modelName].associate(sequelize.models);
    }

    return {
        Users,
        sequelize,
    };
}

module.exports = configureModels;
