/* eslint-disable no-console, import/unambiguous */
console.error = jest.fn(function(msg) {
  throw msg instanceof Error ? msg : new Error(msg);
});
