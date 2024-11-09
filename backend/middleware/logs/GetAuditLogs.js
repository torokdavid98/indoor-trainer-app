const { col } = require('sequelize');
const { Op } = require('sequelize');
const { UnauthorizedError } = require('../../common/errors');
const { ROLES } = require('../../common/constants');
const sorting = require('../sorting');

function GetAuditLogs({ models }) {
    return async function getAuditLogs({
        user: { role },
        params: { limit, offset, sort, sortDir },
    }) {
        if (role && role === ROLES.USER) {
            throw new UnauthorizedError();
        }

        let order;
        switch (sort) {
            case 'created_at':
                order = [col('created_at'), sortDir];
                break;
            case 'log_type':
                order = [col('log_type'), sortDir];
                break;
            default:
                order = sorting(models, sort, sortDir, ['created_at', 'DESC']);
                break;
        }

        const auditlogs = await models.AuditLogs.findAndCountAll({
            limit,
            offset,
            order: [order],
        });

        const uniqueUserIds = [...new Set(auditlogs.rows.map((e) => e.user_id))];

        let users = [];
        if (uniqueUserIds.length > 0) {
            users = await models.Users.findAll({
                where: {
                    id: {
                        [Op.in]: uniqueUserIds,
                    },
                },
                attributes: ['id', 'name'],
            });
        }

        return {
            total: auditlogs.count,
            auditlogs: auditlogs.rows.map((e) => ({
                id: e.id,
                user_id: e.user_id,
                user_name: users?.find((u) => u.id === e.user_id)?.name,
                log_type: e.log_type,
                log_data: e.log_data,
                created_at: e.createdAt,
            })),
        };
    };
}

module.exports = GetAuditLogs;
