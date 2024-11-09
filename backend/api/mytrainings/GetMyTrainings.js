const { Op, col } = require('sequelize');
const sorting = require('../../middleware/sorting');

function GetMyTrainings({ models }) {
    return async function getMyTrainings({
        user,
        params: { offset, limit, sort, sortDir, idList, search },
    }) {
        const filter = {};
        if (search) {
            filter.name = { [Op.like]: `%${search}%` };
        }
        if (idList) {
            filter.id = { [Op.in]: idList };
        }

        let order;
        switch (sort) {
            case 'name':
                order = [col('name'), sortDir];
                break;
            default:
                order = sorting(models, sort, sortDir, ['created_at', 'ASC']);
                break;
        }

        const trainings = await models.Trainings.findAndCountAll({
            where: filter,
            offset,
            limit,
            order: [order],
            include: [
                {
                    model: models.Users,
                    as: 'creator',
                    attributes: ['name', 'id'],
                },
                {
                    model: models.UserTrainings,
                    attributes: ['id', 'status'],
                    as: 'user_trainings_connection',
                    where: {
                        user_id: user.id,
                    },
                    required: true,
                },
            ],
        });

        return {
            total: trainings.count,
            trainings: trainings.rows.map((e) => ({
                id: e.id,
                name: e.name,
                description: e.description,
                length: e.length,
                workout: e.workout,
                type: e.type,
                shared: !!e.shared,
                created_by: e.creator?.name || 'Unknown',
                created_by_id: e.creator?.id,
                saved_training: true,
            })),
        };
    };
}

module.exports = GetMyTrainings;
