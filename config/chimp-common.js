/* eslint-disable import/unambiguous */
module.exports = {
  path: "tests/spec",
  jasmine: true,
  browser: "chrome",
  log: "debug",
  debug: false,
  webdriverio: {
    bail: 1,
    desiredCapabilities: {
      browserName: "chrome",
      javascriptEnabled: true,
      maxInstances: 1,
      loggingPrefs: {
        browser: "ALL",
        driver: "ALL",
        server: "ALL"
      },
      chromeOptions: {
        args: [
          "--headless",
          "--disable-gpu",
          "--incognito",
          "--window-size=1920,1080",
          "--no-sandbox",
          "--disable-extensions"
        ]
      }
    },
    waitforTimeout: 5000,
    waitforInterval: 2000
  },
  seleniumStandaloneOptions: {
    version: "3.5.3",
    drivers: {
      chrome: {
        version: "2.32"
      }
    }
  },
  jasmineConfig: {
    stopSpecOnExpectationFailure: true
  }
};
