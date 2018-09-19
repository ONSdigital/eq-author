import {
  addQuestionnaire,
  addAnswerType,
  addSection,
  testId
} from "../../utils";

describe("Piping", () => {
  const questionnaireTitle = "Piping test";
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    addQuestionnaire(questionnaireTitle);
  });

  it("Can add piping to a page title", () => {
    addAnswerType("Number");
    cy.get(testId("txt-answer-label")).type("Number answer");
    addSection();

    cy.get(testId("nav-page-link"))
      .last()
      .click();

    cy.get(testId("txt-question-title", "testid")).focus();
    cy.get(testId("piping-button"))
      .first()
      .click();

    cy.get(testId("picker-title"))
      .first()
      .click();

    // Section
    cy.get(testId("picker-option"))
      .first()
      .click();
    // Question page
    cy.get(testId("picker-option"))
      .first()
      .click();
    // Answer
    cy.get(testId("picker-option"))
      .first()
      .click();

    cy.get(testId("submit-button")).click();

    cy.get(testId("txt-question-title", "testid")).should(
      "contain",
      "[Number answer]"
    );
  });

  afterEach(() => {
    cy.deleteQuestionnaire(questionnaireTitle);
  });
});
