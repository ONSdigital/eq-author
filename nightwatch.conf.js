/* eslint-disable import/unambiguous, camelcase */
const seleniumServer = require("selenium-server");
const chromeDriver = require("chromedriver");

console.log(chromeDriver.path);
module.exports = {
  src_folders: ["tests/nightwatch/specs"],
  output_folder: "reports",
  custom_commands_path: "tests/nightwatch/commands",
  custom_assertions_path: "tests/nightwatch/assertions",
  page_objects_path: "tests/nightwatch/pages",
  globals_path: "",

  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: "",
    port: 4444,
    cli_args: {
      "webdriver.chrome.driver": chromeDriver.path
    }
  },

  test_settings: {
    default: {
      launch_url: "http://localhost",
      selenium_port: 4444,
      selenium_host: "localhost",
      silent: true,
      screenshots: {
        enabled: false,
        path: ""
      },
      globals: {
        waitForConditionTimeout: 5000
      },
      desiredCapabilities: {
        browserName: "chrome"
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: "chrome"
      }
    },

    edge: {
      desiredCapabilities: {
        browserName: "MicrosoftEdge"
      }
    }
  }
};
