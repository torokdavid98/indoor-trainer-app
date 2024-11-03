const ROLES = Object.freeze({
    USER: 'user',
    ADMIN: 'admin',
});

module.exports.ROLES = ROLES;

const TRAINING_TYPES = Object.freeze({
    RECOVERY: 'recovery',
    INTERVAL: 'interval',
    RACE: 'race',
    LONG_DISTANCE: 'long_distance',
    OTHER: 'other',
});

module.exports.TRAINING_TYPES = TRAINING_TYPES;

const TRAINING_STATUS = Object.freeze({
    PENDING: 'pending',
    FINISHED: 'finished',
    CANCELLED: 'cancelled',
});

module.exports.TRAINING_STATUS = TRAINING_STATUS;
