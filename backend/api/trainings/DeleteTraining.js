const { ROLES } = require('../../common/constants');
const { NotFoundError, UnauthorizedError } = require('../../common/errors');

function DeleteTraining({ models, services: { AuditLogService } }) {
    return async function deleteTraining({ user, params: { id } }) {
        const training = await models.Trainings.findByPk(id);

        if (!training) {
            throw new NotFoundError('Training not found');
        }

        // check if user has permission to delete
        if (user.role !== ROLES.ADMIN && training.created_by !== user.id) {
            throw new UnauthorizedError('You do not have permission to delete this training');
        }

        await training.destroy();

        // remove training from user's list
        await models.UserTrainings.destroy({
            where: {
                training_id: id,
            },
        });

        // audit log
        await AuditLogService.log(models, user.id, 'delete_training', {
            id,
            name: training.name,
        });

        return {
            status: 'success',
        };
    };
}

module.exports = DeleteTraining;
