/* eslint-disable import/unambiguous */

module.exports = {
  "visit create form": browser => {
    browser
      .url("http://localhost:3000")
      .waitForElementVisible("body", 1000)
      .click("#btn-create-questionnaire")
      .waitForElementVisible("form")
      .assert.urlContains("");
  },

  "create questionnaire": browser => {
    browser
      .setValue("#title", "a title")
      .setValue("#description", "a description of some kind")
      .click("label[for='navigation']")
      .click("button[type='submit']");

    browser.assert
      .containsText("header", "a title")
      .assert.urlContains("questionnaire/1/design/1/1");
  },

  "add a page": browser => {
    browser
      .click("#btn-add-page")
      .pause(1000)
      .assert.urlContains("questionnaire/1/design/1/2");
  },

  "delete a page": browser => {
    const SELECTOR = "[aria-label='Delete page']";

    browser.elements("css selector", SELECTOR, buttons => {
      browser
        .elementIdClick(buttons.value[0].ELEMENT)
        .pause(500)
        .elements("css selector", SELECTOR, buttons => {
          browser.assert.equal(buttons.value.length, 1);
        });
    });
  },

  "add a section": browser => {
    browser
      .click("button[class*='AddSectionBtn']")
      .pause(500)
      .assert.urlContains("questionnaire/1/design/2/3");
  },

  "delete a section": browser => {
    const SELECTOR = "[aria-label='Delete section']";

    browser.elements("css selector", SELECTOR, buttons => {
      browser
        .elementIdClick(buttons.value[0].ELEMENT)
        .pause(500)
        .elements("css selector", SELECTOR, buttons => {
          browser.assert.equal(buttons.value.length, 1);
        });
    });
  },

  "deleting the last page of a section": browser => {
    const SELECTOR = "[aria-label='Delete page']";

    browser.click(SELECTOR).assert.urlContains("questionnaire/1/design/2/4");
  },

  "deleting the last section of a questionnaire": browser => {
    const SELECTOR = "[aria-label='Delete section']";

    browser
      .click(SELECTOR)
      .pause(500)
      .assert.urlContains("questionnaire/1/design/3/5");
  },

  finished: browser => browser.end()
};
