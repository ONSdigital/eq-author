import { matchPath } from "../../src/utils/UrlUtils";
import { zipWith } from "lodash";

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

export const addSection = () =>
  cy.get("[data-test='add-menu']").within(() => {
    cy
      .get("button")
      .contains("Add")
      .click()
      .get("button")
      .contains("Section")
      .click();
  });

export const addQuestionPage = () =>
  cy.get("[data-test='add-menu']").within(() => {
    cy
      .get("button")
      .contains("Add")
      .click()
      .get("button")
      .contains("Question Page")
      .click();
  });

export const buildMultipleChoiceAnswer = labelArray => {
  addAnswerType("Checkbox");
  labelArray.map(label => {
    cy
      .get("[data-test='option-label']")
      .last()
      .type(label);
    cy.get("[data-test='btn-add-option']").click();
  });
  cy
    .get("[data-test='btn-delete-option']")
    .last()
    .click();
};

export const buildMultipleRouting = (questionTitles, labels, operator) => {
  zipWith(questionTitles, labels, (questionTitle, label) => {
    operator == "And"
      ? cy
          .get("[data-test='btn-add']")
          .last()
          .click()
      : cy.get("[data-test='btn-add-rule']").click();

    cy
      .get("[data-test='routing-rule']")
      .last()
      .within(() => {
        findByLabel("IF")
          .last()
          .select(questionTitle);

        cy
          .get("[data-test='options-selector']")
          .last()
          .within(() => {
            cy.contains(label).click();
          });
      });
  });
};

export function addAnswerType(answerType) {
  cy.get("[data-test='btn-add-answer']").click();
  cy.contains(answerType).click();
}

export function assertHash({
  previousPath,
  previousHash,
  currentPath,
  equality
}) {
  const match = (path, hash) => {
    hash = hash.substr(1).replace(Cypress.env("BASE_NAME"), "");

    return matchPath(hash, {
      path,
      exact: true,
      strict: false
    });
  };

  cy
    .log("comparing previous hash", previousHash)
    .hash()
    .should(currentHash => {
      const previousMatch = match(previousPath, previousHash);
      const currentMatch = match(currentPath, currentHash);

      expect(previousMatch).not.to.equal(null);
      expect(currentMatch).not.to.equal(null);

      Object.keys(equality).forEach(key => {
        const previousParam = previousMatch.params[key];
        const currentParam = currentMatch.params[key];

        if (equality[key]) {
          expect(previousParam, key).to.equal(currentParam);
        } else {
          expect(previousParam, key).not.to.equal(currentParam);
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
    .log("Find by label", text)
    .get("label")
    .contains(text)
    .then($label => $label.prop("control"));
