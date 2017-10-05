const CHECKBOX_ANSWER_LABEL_INPUT = "input[data-qa='optionLabel']";
const BUTTON_ADD_OTHER_OPTION = "button[data-qa='addAnotherOption']";
const PAUSE_DURATION = 300;

class CheckboxAnswerPage {
  getOptionLabelElements() {
    browser.waitForVisible(CHECKBOX_ANSWER_LABEL_INPUT);
    return browser.elements(CHECKBOX_ANSWER_LABEL_INPUT);
  }

  setOption(index, label) {
    const optionLabels = this.getOptionLabelElements();

    if (index > optionLabels.length) {
      throw new Error("Tried setting option which doesn't exist", optionLabels);
    }

    const labelElement = optionLabels.value[index].ELEMENT;

    /*
     * The pauses below are a pain, but they were added to overcome some peculiarities in the JSON wire protocol
     * used by WebDriver.
     *
     * If the pauses are removed, the input is not cleared completely, and the value is not written completely.
     */

    browser.elementIdClick(labelElement);
    browser.pause(PAUSE_DURATION);
    browser.elementIdClear(labelElement);
    browser.pause(PAUSE_DURATION);
    browser.elementIdValue(labelElement, label);
    browser.pause(PAUSE_DURATION);

    return this;
  }

  addOption() {
    browser.waitForVisible(BUTTON_ADD_OTHER_OPTION);
    browser.click(BUTTON_ADD_OTHER_OPTION);
    browser.pause(PAUSE_DURATION);
    return this;
  }

  getOptionLabelValues() {
    const elems = this.getOptionLabelElements();
    const optionLabelValues = elems.value.map(element => element.getValue());

    return optionLabelValues;
  }
}

export default new CheckboxAnswerPage();
