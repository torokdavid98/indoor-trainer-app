const { NotFoundError } = require('../../common/errors');

function EditMe({ models, services: { AuditLogService } }) {
    return async function editMe({ user: { id }, data: { name, profile_picture } }) {
        const me = await models.Users.findByPk(id);
        if (!me) {
            throw new NotFoundError();
        }

        await me.update({
            name,
            // profile_picture,
        });

        // audit log
        await AuditLogService.log(models, id, 'edit_me', {
            userId: id,
            name,
            // profilePicture: profile_picture,
        });

        return {
            status: 'success',
        };
    };
}

module.exports = EditMe;
