// jest.config.js
module.exports = {
  moduleNameMapper: {
    "^axios$": "<rootDir>/node_modules/axios/lib/axios.js"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(my-special-module)/).*$"
  ]
};
