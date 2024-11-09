const { APIError } = require('../../common/errors');

function AddTraining({ models, services: { AuditLogService } }) {
    return async function addTraining({
        user,
        data: { name, description, length, workout, type, shared },
    }) {
        if (!name) {
            throw new APIError('A név megadása kötelező!');
        }

        if (name.length > 255) {
            throw new APIError('A név maximum 255 karakter lehet!');
        }

        if (description && description.length > 255) {
            throw new APIError('A leírás maximum 255 karakter lehet!');
        }

        // TODO: compare length and workout to be the same length

        const training = await models.Trainings.create({
            name,
            description,
            length,
            workout,
            created_by: user.id,
            type,
            shared,
        });

        // when creating a new training, it is automatically saved for the creator
        await models.UserTrainings.create({
            user_id: user.id,
            training_id: training.id,
            status: 'pending',
        });

        // audit log
        await AuditLogService.log(models, user.id, 'add_training', {
            id: training.id,
            name,
            description,
            length,
            workout,
            created_by: user.id,
            type,
            shared,
        });

        return {
            status: 'success',
        };
    };
}

module.exports = AddTraining;
