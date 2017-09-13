/* eslint-disable import/unambiguous */
const commonConfig = require("./chimp-common");
const merge = require("lodash").merge;

module.exports = merge({}, commonConfig, {
  jasmineConfig: {
    specFiles: ["smoketest-storybook-spec.js"]
  }
});
