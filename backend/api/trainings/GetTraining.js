const { ROLES } = require('../../common/constants');
const { NotFoundError } = require('../../common/errors');

function GetTraining({ models }) {
    return async function getTraining({ user, params: { id } }) {
        const training = await models.Trainings.findByPk(id, {
            include: [
                {
                    model: models.Users,
                    as: 'creator',
                    attributes: ['name', 'id'],
                },
                {
                    model: models.UserTrainings,
                    attributes: ['id'],
                    as: 'user_trainings_connection',
                    where: {
                        user_id: user.id,
                    },
                    required: false,
                },
            ],
        });

        if (!training) {
            throw new NotFoundError('Training not found');
        }

        if (!training.shared && training.created_by !== user.id && user.role !== ROLES.ADMIN) {
            throw new NotFoundError('Training is private');
        }

        return {
            id: training.id,
            name: training.name,
            description: training.description,
            length: training.length,
            workout: training.workout,
            type: training.type,
            shared: !!training.shared,
            created_by: training.creator?.name || 'Unknown',
            created_by_id: training.creator?.id,
            saved_training: !!training.user_trainings_connection.length,
        };
    };
}

module.exports = GetTraining;
