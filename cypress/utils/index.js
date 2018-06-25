import { matchPath } from "../../src/utils/UrlUtils";
import { zipWith } from "lodash";

export const answerTypes = ["Text", "Textarea", "Currency", "Number"];
export const testId = (id, attr = "test") => `[data-${attr}="${id}"]`;

export const selectOptionByLabel = label => {
  cy
    .get("option")
    .contains(label)
    .then(option => option.val())
    .then(value => {
      cy
        .root()
        .select(label)
        .should("have.value", value);
    });
};

export function setQuestionnaireSettings(name) {
  cy.get(`[data-testid="questionnaire-settings-modal"]`).within(() => {
    cy
      .get(testId("txt-questionnaire-title"))
      .clear()
      .type(name);
    cy.get("label[for='navigation']").click();

    cy.get("form").submit();
  });
}

export const addQuestionnaire = title => {
  cy.get("[data-test='create-questionnaire']").click();
  setQuestionnaireSettings(title);
};

export const addSection = () =>
  cy.get(testId("add-menu")).within(() => {
    cy
      .get("button")
      .contains("Add")
      .click()
      .get("button")
      .contains("Section")
      .click();
  });

export const addQuestionPage = () =>
  cy.get(testId("add-menu")).within(() => {
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
  labelArray.map((label, index) => {
    cy.get(testId("answer-editor")).should("have.length", index + 1);
    cy
      .get(testId("option-label"))
      .last()
      .type(label);
    cy.get(testId("btn-add-option")).click();
  });
  cy
    .get(testId("btn-delete-option"))
    .last()
    .click();
};

export function addAnswerType(answerType) {
  cy.get("[data-test='btn-add-answer']").click({ force: true });
  cy.get("[role='menu']").within(() => {
    cy.contains(answerType).click({ force: true });
  });
}

export const matchHashToPath = (path, hash) => {
  hash = hash.substr(1).replace(Cypress.env("BASE_NAME"), "");

  return matchPath(hash, {
    path,
    exact: true,
    strict: false
  });
};

export function assertHash({
  previousPath,
  previousHash,
  currentPath,
  equality
}) {
  cy
    .log("comparing previous hash", previousHash)
    .hash()
    .should(currentHash => {
      const previousMatch = matchHashToPath(previousPath, previousHash);
      const currentMatch = matchHashToPath(currentPath, currentHash);

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

export const removeAnswer = params =>
  cy.get("[data-test='btn-delete-answer']").click(params);
