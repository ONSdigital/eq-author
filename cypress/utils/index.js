export function setQuestionnaireSettings(name) {
  cy.get(`[data-testid="questionnaire-settings-modal"]`).within(() => {
    cy
      .get("[data-test='txt-questionnaire-title']")
      .clear()
      .type(name);
    cy.get("label[for='navigation']").click();

    cy.get("form").submit();
  });
}

export function addAnswerType(answerType) {
  cy.get("[data-test='btn-add-answer']").click();
  cy.contains(answerType).click();
}

const extractUrlVars = hash => {
  const URL_REGEX = /questionnaire\/(\d+)\/design\/(\d+)\/?(\d+)?/;
  const [, questionnaireId, sectionId, pageId] = hash.match(URL_REGEX) || [];

  return { questionnaireId, sectionId, pageId };
};

export function assertHash(previousHash, equality) {
  cy.hash().should(currentHash => {
    const previousVars = extractUrlVars(previousHash);
    const currentVars = extractUrlVars(currentHash);

    Object.keys(previousVars).forEach(key => {
      if (equality[key]) {
        expect(previousVars[key], key).to.equal(currentVars[key]);
      } else {
        expect(previousVars[key], key).not.to.equal(currentVars[key]);
      }
    });
  });
}

export const typeIntoDraftEditor = (selector, text) => {
  cy
    .log("Typing into RTE", text)
    .get(selector)
    .then(input => {
      var textarea = input.get(0);
      textarea.dispatchEvent(new Event("focus"));

      var textEvent = document.createEvent("TextEvent");
      textEvent.initTextEvent("textInput", true, true, null, text);
      textarea.dispatchEvent(textEvent);

      textarea.dispatchEvent(new Event("blur"));
    });
};

export const findByLabel = text =>
  cy
    .get("label")
    .contains(text)
    .then($label => $label.prop("control"));
