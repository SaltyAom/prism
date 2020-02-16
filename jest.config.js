module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    "moduleNameMapper": {
        "\\.(css|styl|.scss|.less|.sass)$": "<rootDir>/__mocks__/styleMock.js"
   }
}