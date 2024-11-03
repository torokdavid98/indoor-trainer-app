const Users = require('../models/Users');
const Trainings = require('../models/Trainings');
const UserTrainings = require('../models/UserTrainings');
const AuditLogs = require('../models/AuditLogs');

function configureModels(sequelize) {
    Users.init(sequelize);
    Trainings.init(sequelize);
    UserTrainings.init(sequelize);
    AuditLogs.init(sequelize);

    const { models } = sequelize;

    for (const modelName of Object.keys(models)) {
        sequelize.models[modelName].associate(sequelize.models);
    }

    return {
        Users,
        Trainings,
        UserTrainings,
        AuditLogs,
        sequelize,
    };
}

module.exports = configureModels;
