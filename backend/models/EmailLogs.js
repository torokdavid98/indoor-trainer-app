const { Model, DataTypes } = require('sequelize');

class EmailLogs extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                to: {
                    type: DataTypes.STRING(250),
                    allowNull: false,
                },
                subject: {
                    type: DataTypes.STRING(250),
                    allowNull: false,
                },
                html: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                options: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                result: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                ejs: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                    defaultValue: null,
                },
            },
            {
                sequelize,
                tableName: 'email_logs',
                underscored: true,
                charset: 'utf8',
                paranoid: false,
                timestamps: true,
            }
        );
    }

    static associate({ Users }) {
        this.belongsTo(Users, { foreignKey: 'user_id' });
    }
}

module.exports = EmailLogs;
