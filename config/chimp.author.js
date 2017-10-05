/* eslint-disable import/unambiguous */
const commonConfig = require("./chimp-common");
const merge = require("lodash").merge;

module.exports = merge({}, commonConfig, {
  jasmineConfig: {
    specFiles: [
      "smoketest-author-spec.js",
      "issues/checkbox-values-lost-spec.js"
    ]
  }
});
