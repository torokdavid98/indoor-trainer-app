/**
 * Access token key name in local storage
 * @type {string}
 */
export const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * Logged in user key name in local storage
 * @type {string}
 */
export const LOGGED_IN_USER_KEY = 'loggedInUser';

/**
 * Backend url for openapi
 * @type {string}
 */
export const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:4000`;
