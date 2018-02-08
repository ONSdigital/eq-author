export function setQuestionnaireSettings(name) {
  cy.get(`[data-test="questionnaire-settings-form"]`).within(() => {
    cy.get("#title").type(name);
    cy.get("label[for='navigation']").click();
    cy.get(`button[type='submit']`).click();
  });
}

export function addAnswerType(answerType) {
  cy.get("#add-answer-button").click();
  cy.contains(answerType).click();
}

const extractUrlVars = hash => {
  const URL_REGEX = /questionnaire\/(\d+)\/design\/(\d+)\/(\d+)/;
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
