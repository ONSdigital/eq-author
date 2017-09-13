module.exports = {
  path: "tests/spec",
  jasmine: true,
  browser: "chrome",
  log: "info",
  debug: false,
  webdriverio: {
    desiredCapabilities: {
      browserName: "chrome",
      javascriptEnabled: true,
      maxInstances: 1,
      bail: 1
    },
    logLevel: "error"
  },
  seleniumStandaloneOptions: {
    // check for more recent versions of selenium here:
    // http://selenium-release.storage.googleapis.com/index.html
    version: "3.5.3",
    // http://selenium-release.storage.googleapis.com/3.5/selenium-server-standalone-3.5.3.jar
    baseURL: "https://selenium-release.storage.googleapis.com",
    drivers: {
      chrome: {
        // check for more recent versions of chrome driver here:
        // http://chromedriver.storage.googleapis.com/index.html
        version: "2.32",
        arch: process.arch,
        baseURL: "https://chromedriver.storage.googleapis.com"
      }
    }
  },
  jasmineConfig: {
    stopSpecOnExpectationFailure: true
  }
};
