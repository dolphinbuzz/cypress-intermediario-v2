const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //viewportWidth: 1920,
  //viewportHeight: 1080,
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true,
      requestMode: true,
      snapshotOnly: true,
    },
    experimentalRunAllSpecs: true,
  },
  fixturesFolder: false,
  video: false,
})