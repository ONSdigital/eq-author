import { setQuestionnaireSettings, testId } from "../utils";

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.contains("Sign in as Guest").click();
});

Cypress.Commands.add("createQuestionnaire", title => {
  cy.get(testId("logo")).click();
  cy.get(testId("create-questionnaire")).click();
  setQuestionnaireSettings(title);
});

Cypress.Commands.add("deleteQuestionnaire", title => {
  cy.get(testId("logo")).click();
  cy.get("table").within(() => {
    cy
      .contains(title)
      .closest("tr")
      .within(() => {
        cy.get("button").click();
      });
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
