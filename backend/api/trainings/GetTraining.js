const { ROLES } = require('../../common/constants');
const { NotFoundError } = require('../../common/errors');

function GetTraining({ models }) {
    return async function getTraining({ user, params: { id } }) {
        const training = await models.Trainings.findByPk(id);

        if (!training) {
            throw new NotFoundError('Training not found');
        }

        if (!training.shared && training.created_by !== user.id && user.role !== ROLES.ADMIN) {
            throw new NotFoundError('Training is private');
        }

        // find who created the training
        const userCreated = await models.Users.findByPk(training.created_by);

        return {
            id: training.id,
            name: training.name,
            description: training.description,
            length: training.length,
            workout: training.workout,
            type: training.type,
            shared: training.shared,
            created_by: userCreated ? userCreated?.name : 'Unknown',
        };
    };
}

module.exports = GetTraining;
