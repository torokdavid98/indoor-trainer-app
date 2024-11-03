const { Model, DataTypes } = require('sequelize');

class AuditLogs extends Model {
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
                    allowNull: true,
                },
                log_type: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                log_data: {
                    type: DataTypes.TEXT('medium'),
                    allowNull: false,
                    get() {
                        const raw = this.getDataValue('log_data');
                        if (!raw) {
                            return {};
                        }
                        try {
                            const parsed = JSON.parse(raw);
                            if (typeof parsed !== 'object' || Array.isArray(parsed))
                                throw new Error('Need object');
                            return parsed;
                        } catch (e) {
                            return {};
                        }
                    },
                    set(obj) {
                        this.setDataValue('log_data', obj === '' ? null : JSON.stringify(obj));
                    },
                },
            },
            {
                sequelize,
                tableName: 'audit_logs',
                underscored: true,
                charset: 'utf8',
                paranoid: false,
                timestamps: true,
                updatedAt: false,
            }
        );
    }

    static associate() {}
}

module.exports = AuditLogs;
