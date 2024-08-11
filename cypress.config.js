const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     viewportWidth: 1920,
    viewportHeight: 1200,
  },
  projectId: "soko7k",
});
