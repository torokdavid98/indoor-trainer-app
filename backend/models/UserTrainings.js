const { Model, DataTypes } = require('sequelize');
const { TRAINING_STATUS } = require('../common/constants');

class UserTrainings extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                training_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM(Object.values(TRAINING_STATUS)),
                    allowNull: false,
                    defaultValue: TRAINING_STATUS.PENDING,
                },
                finished_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: 'user_trainings',
                underscored: true,
                charset: 'utf8',
                paranoid: false,
                timestamps: true,
            }
        );
    }

    static associate({ Users, Trainings }) {
        this.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(Trainings, { foreignKey: 'training_id', as: 'training' });
    }
}

module.exports = UserTrainings;
