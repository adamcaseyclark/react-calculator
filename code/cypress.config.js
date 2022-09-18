const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  screenshotOnRunFailure: false,
  video: false,

  env: {
    TESTING_IN_DEBUG_MODE: true,
    KNOWN_BUG_CLEARING_DATA_ONLY_HAPPENING_IN_CYPRESS: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
