function normaliseSelector(selector) {
  return typeof selector === "string"
    ? selector
    : selector.map(s => s.selector).join(" ");
}

exports.command = function clickNth(selector, n, callback) {
  var client = this;

  // selector can either be a string or an array (in case of page object)
  selector = normaliseSelector(selector);

  function executor(selector, n) {
    var elements = document.querySelectorAll(selector);
    elements[n].click();
  }

  function done() {
    if (callback) {
      return callback.call(client);
    }
  }

  return client.execute(executor, [selector, n], done);
};
