const { Model, DataTypes } = require('sequelize');

class AiCache extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                prompt: {
                    type: DataTypes.TEXT('long'),
                    allowNull: false,
                },
                response: {
                    type: DataTypes.TEXT('long'),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'aicache',
                underscored: true,
                charset: 'utf8',
                timestamps: true,
            }
        );
    }

    static associate({}) {}
}

module.exports = AiCache;
