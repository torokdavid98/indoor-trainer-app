const { TRAINING_STATUS } = require('../../common/constants');
const { NotFoundError } = require('../../common/errors');

function UpdateTrainingList({ models, services: { AuditLogService } }) {
    return async function updateTrainingList({ user, params: { id } }) {
        const training = await models.Trainings.findByPk(id);
        if (!training) {
            throw new NotFoundError('Training not found');
        }

        if (!training.shared && training.created_by !== user.id) {
            throw new NotFoundError('Training is private');
        }

        // check if user already has this training
        const existing = await models.UserTrainings.findOne({
            where: {
                user_id: user.id,
                training_id: training.id,
            },
        });

        if (existing) {
            // delete training
            await models.UserTrainings.destroy({
                where: {
                    user_id: user.id,
                    training_id: training.id,
                },
            });
        } else {
            await models.UserTrainings.create({
                user_id: user.id,
                training_id: training.id,
                status: TRAINING_STATUS.PENDING,
            });
        }

        // audit log
        await AuditLogService.log(models, user.id, 'update_training', {
            id: training.id,
            user_id: user.id,
            status: existing ? 'deleted' : 'added',
        });

        return {
            status: 'success',
        };
    };
}

module.exports = UpdateTrainingList;
