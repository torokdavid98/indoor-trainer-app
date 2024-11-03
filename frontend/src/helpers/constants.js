// How many rows to show per page by default
export const TABLE_ROW_COUNT_DEFAULT = 25;
// Row count options for tables
export const TABLE_ROW_COUNT_OPTIONS = [25, 50, 100];

// Roles
export const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
});

// Audit log
export const AUDIT_LOG_DESCRIPTIONS = Object.freeze({
    login: 'User logged in',
    save_two_factor_auth: 'User saved two factor authentication',
    add_training: 'User added training',
    update_training: 'User added/removed training to own list',
});
