const Users = require('../models/Users');
const Trainings = require('../models/Trainings');
const UserTrainings = require('../models/UserTrainings');
const AuditLogs = require('../models/AuditLogs');
const AiCache = require('../models/AiCache');
const EmailLogs = require('../models/EmailLogs');
const Pwresets = require('../models/Pwresets');

function configureModels(sequelize) {
    Users.init(sequelize);
    Trainings.init(sequelize);
    UserTrainings.init(sequelize);
    AuditLogs.init(sequelize);
    AiCache.init(sequelize);
    EmailLogs.init(sequelize);
    Pwresets.init(sequelize);

    const { models } = sequelize;

    for (const modelName of Object.keys(models)) {
        sequelize.models[modelName].associate(sequelize.models);
    }

    return {
        Users,
        Trainings,
        UserTrainings,
        AuditLogs,
        AiCache,
        EmailLogs,
        Pwresets,
        sequelize,
    };
}

module.exports = configureModels;
