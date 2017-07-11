/* eslint-disable no-console */
console.error = jest.fn(function(msg) {
  throw msg instanceof Error ? msg : new Error(msg);
});

export {};
