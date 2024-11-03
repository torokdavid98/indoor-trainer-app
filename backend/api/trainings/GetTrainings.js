const { col, Op } = require('sequelize');
const sorting = require('../../middleware/sorting');
const { ROLES } = require('../../common/constants');

function GetTrainings({ models }) {
    return async function getTrainings({
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

        // if not admin, only show shared trainings (except for the user's own trainings)
        if (user.role !== ROLES.ADMIN) {
            filter[Op.or] = [
                {
                    shared: true,
                },
                {
                    created_by: user.id,
                },
            ];
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
            logging: console.log,
            where: filter,
            offset,
            limit,
            order: [order],
        });

        return {
            total: trainings.count,
            trainings: trainings.rows.map((training) => ({
                id: training.id,
                name: training.name,
                description: training.description,
            })),
        };
    };
}

module.exports = GetTrainings;
