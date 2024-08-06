// jest.config.js
module.exports = {
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    "^axios$": "<rootDir>/node_modules/axios/lib/axios.js"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(my-special-module)/).*$"
  ]
};
