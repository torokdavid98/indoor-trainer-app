const { Model, DataTypes } = require('sequelize');
const { TRAINING_TYPES } = require('../common/constants');

class Trainings extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                description: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                length: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                workout: {
                    type: DataTypes.TEXT('medium'),
                    allowNull: false,
                    get() {
                        const raw = this.getDataValue('workout');
                        if (!raw) {
                            return [];
                        }
                        try {
                            const parsed = JSON.parse(raw);
                            if (!Array.isArray(parsed)) {
                                return [];
                            }
                            return parsed;
                        } catch (e) {
                            return [];
                        }
                    },
                    set(arr) {
                        this.setDataValue('workout', arr === '' ? null : JSON.stringify(arr));
                    },
                },
                created_by: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM(Object.values(TRAINING_TYPES)),
                    allowNull: false,
                },
                shared: {
                    type: DataTypes.TINYINT(1),
                    allowNull: false,
                    defaultValue: 1,
                },
                // TODO: cover image, difficulty
            },
            {
                sequelize,
                tableName: 'trainings',
                underscored: true,
                charset: 'utf8',
                paranoid: true,
                timestamps: true,
            }
        );
    }

    // TODO: likes, views

    static associate({ Users, UserTrainings /* TrainingsLikes */ }) {
        this.belongsTo(Users, { foreignKey: 'created_by', as: 'creator' });
        this.belongsToMany(Users, {
            through: UserTrainings,
            foreignKey: 'training_id',
            as: 'user_trainings',
        });
        this.hasMany(UserTrainings, { foreignKey: 'training_id', as: 'user_trainings_connection' });

        // this.hasMany(TrainingsLikes, { foreignKey: 'training_id', as: 'likes' });
    }
}

module.exports = Trainings;
