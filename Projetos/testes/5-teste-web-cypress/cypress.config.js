const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    video: true,
    screenshotOnRunFailure: true,

    baseUrl: 'http://localhost:4000',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
