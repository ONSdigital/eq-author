exports.assertion = function elementCount(selector, expected) {
  this.message = "Testing if element <" + selector + "> has count: " + expected;

  this.expected = function() {
    return expected;
  };

  this.pass = function pass(val) {
    return val === expected;
  };

  this.value = function value(res) {
    return res.value.length;
  };

  this.command = function command(callback) {
    return this.api.elements(this.client.locateStrategy, selector, callback);
  };
};
