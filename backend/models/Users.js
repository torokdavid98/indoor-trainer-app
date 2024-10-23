const { Model, DataTypes } = require('sequelize');

class Users extends Model {
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
                email: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                role: {
                    type: DataTypes.ENUM('admin', 'user'),
                    allowNull: false,
                },
                profile_picture: {
                    type: DataTypes.STRING(400),
                    allowNull: true,
                },
                two_factor_secret: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                    defaultValue: null,
                },
            },
            {
                sequelize,
                tableName: 'users',
                underscored: true,
                charset: 'utf8',
                paranoid: true,
                timestamps: true,
            }
        );
    }

    static associate({ Pwresets, EmailLogs }) {
        // this.hasMany(Pwresets);
        // this.hasMany(EmailLogs);
    }
}

module.exports = Users;
