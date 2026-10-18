const { defineConfig } = require("cypress");
const cypressOnFix = require("cypress-on-fix");

module.exports = defineConfig({
  allowCypressEnv: true,

  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    reportFilename: "mochawesome",
    html: true,
    json: true,
    overwrite: true,
    charts: true,
    embeddedScreenshots: true,
    saveAllAttempts: false,
    reportPageTitle: "Relatório de Testes Cypress",
  },

  e2e: {
    // Grava vídeos dos testes.
    video: true,

    // Captura screenshots quando os testes falham.
    screenshotOnRunFailure: true,

    // URL base da aplicação.
    baseUrl: "http://localhost:4000",

    setupNodeEvents(on, config) {
      // Permite que os plugins compartilhem os eventos do Cypress.
      on = cypressOnFix(on);

      // Registra o plugin Mochawesome.
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },
  },
});