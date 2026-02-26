module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/js/**/*.test.js'],
    collectCoverageFrom: [
        'js/**/*.js',
        '!js/**/*.test.js',
        '!js/**/app-browser.js'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    verbose: true
};