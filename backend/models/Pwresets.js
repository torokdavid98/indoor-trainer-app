const { Model, DataTypes } = require('sequelize');

class Pwresets extends Model {
    static init(sequelize) {
        super.init(
            {
                token: {
                    type: DataTypes.STRING(80),
                    primaryKey: true,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'pwresets',
                underscored: true,
                charset: 'utf8',
                paranoid: true,
                timestamps: true,
            }
        );
    }

    static associate({ Users }) {
        this.belongsTo(Users, { foreignKey: 'user_id' });
    }
}

module.exports = Pwresets;
