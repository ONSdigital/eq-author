/* eslint-disable camelcase */
import createQuestionnaire from "../../fixtures/createQuestionnaire";
import GetQuestionPage from "../../fixtures/GetQuestionPage";
import GetQuestionnaire from "../../fixtures/GetQuestionnaire";
import { testId, typeIntoDraftEditor } from "../../utils";
import UpdateQuestionPage from "../../fixtures/duplicatePage/UpdateQuestionPage";
import duplicatePage from "../../fixtures/duplicatePage/duplicatePage";
import GetQuestionnaire_Piping from "../../fixtures/GetQuestionnaire_Piping";

describe("Duplicate page", () => {
  beforeEach(() => {
    cy.visitStubbed("#/questionnaire/1/1/1/design", {
      createQuestionnaire,
      GetQuestionPage,
      GetQuestionnaire,
      GetQuestionnaire_Piping,
      UpdateQuestionPage,
      duplicatePage
    });
    cy.login();

    typeIntoDraftEditor(testId("txt-question-title", "testid"), "Question 1");
    cy.get(testId("side-nav")).should("contain", "Question 1");
    cy.get(testId("btn-duplicate-page")).click();
  });

  it("should display copy of page in sidebar", () => {
    cy.get(testId("side-nav")).should("contain", "Copy of Question 1");
  });

  it("should navigate to new page after duplicating", () => {
    cy.hash().should("match", /\/questionnaire\/1\/1\/2\/design$/);
  });
});
