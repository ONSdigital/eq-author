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
    logLevel: "silent"
  }
};
