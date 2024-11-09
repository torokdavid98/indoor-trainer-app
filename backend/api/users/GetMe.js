const { NotFoundError } = require('../../common/errors');

function GetMe({ models }) {
    return async function getMe({ user: { id } }) {
        const user = await models.Users.findByPk(id);

        if (!user) {
            throw new NotFoundError('User not found!');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile_picture: user.profile_picture,
            two_factor_secret: user.two_factor_secret !== null,
        };
    };
}

module.exports = GetMe;
