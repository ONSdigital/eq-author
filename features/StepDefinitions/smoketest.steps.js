const expect = require("chai").expect;

module.exports = function () {
  this.Given(/^I navigate to "([^"]*)"$/, (url) => {
    browser.url(url);
  });

  this.Then(/^the page title should be "(.+)"$/, (title) => {
      expect(browser.getTitle()).to.be.eql(title);
  });
};
