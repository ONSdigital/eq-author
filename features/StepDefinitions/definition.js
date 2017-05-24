/* global browser */
/* eslint-disable no-console */
const expect = require("chai").expect;

module.exports = function () {
  this.Given(/^I go to the website "([^"]*)"$/, (url) => {
    browser.url(url);
  });

  this.Then(/no errors are logged/, () => {
    console.log("foo");
    const logs = browser.log("browser");
    console.log(logs);
    // const errors = logs.value.filter(log => log.level === "SEVERE");

    expect(logs.value.length).to.be.eql(0);
  });
};
