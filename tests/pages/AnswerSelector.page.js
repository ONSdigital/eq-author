const BUTTON_ADD_ANSWER = "#add-answer-btn";
const BUTTON_CHECKBOX_ANSWER = "button[title='Checkbox']";

class AnswerSelectorPage {
  addAnswer() {
    browser.waitForVisible(BUTTON_ADD_ANSWER);
    const addAnswerButton = browser.element(BUTTON_ADD_ANSWER);
    browser.elementIdClick(addAnswerButton.value.ELEMENT);
    return this;
  }

  checkbox() {
    browser.waitForVisible(BUTTON_CHECKBOX_ANSWER);
    const checkboxAnswer = browser.element(BUTTON_CHECKBOX_ANSWER);
    browser.elementIdClick(checkboxAnswer.value.ELEMENT);
    return this;
  }
}

export default new AnswerSelectorPage();
