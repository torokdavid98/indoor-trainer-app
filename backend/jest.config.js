/** @type {import('jest').Config} */
const config = {
    verbose: true,
    coveragePathIgnorePatterns: [],
    collectCoverage: false,
    collectCoverageFrom: [
        'api/**/*.js',
        'common/**/*.js',
        'middleware/**/*.js',
        'models/**/*.js',
        'services/**/*.js',
        '*.js',
    ],
    testMatch: ['**/**/*.test.js'],
    coverageReporters: ['json', 'html'],
};

module.exports = config;
