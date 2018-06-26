import {
  setQuestionnaireSettings,
  addAnswerType,
  assertHash,
  typeIntoDraftEditor,
  findByLabel,
  addSection,
  addQuestionPage,
  buildMultipleChoiceAnswer,
  buildMultipleRouting,
  assertCheckboxInput
} from "../utils";
import { times, last } from "lodash";
import { Routes } from "../../src/utils/UrlUtils";

describe("Routing", () => {
  it("should see no routing rules exist and add one", () => {
    cy.visit("/");
    cy.contains("Sign in as Guest").click();
    cy.get("h1").should("contain", "Your Questionnaires");
    cy.get("[data-test='create-questionnaire']").click();
    setQuestionnaireSettings("Routing test questionnaire");

    typeIntoDraftEditor("[data-testid='txt-question-title']", "question 1");

    cy.get("[data-test='tabs-nav']").within(() => {
      cy.contains("Routing").click();
    });

    cy
      .get('[data-test="routing-rule-set-empty-msg"]')
      .should("contain", "No routing rules exist for this question");
    cy.get("[data-test='btn-add-rule']").click();

    cy
      .get('[data-test="routing-rule"]')
      .should("contain", "No answers have been added to this question yet.");
  });

  it("follows the link to add a answer and routing updates with the new answer", () => {
    cy
      .get("a")
      .contains("add an answer")
      .click();

    addAnswerType("Checkbox");

    cy.get("[data-test='option-label']").type("A");
    cy.get("[data-test='btn-add-option']").click();

    cy
      .get("[data-test='option-label']")
      .last()
      .type("B");
    cy.get("[data-test='btn-add-option']").click();

    cy
      .get("[data-test='option-label']")
      .last()
      .type("C");

    cy.get("[data-test='tabs-nav']").within(() => {
      cy.contains("Routing").click();
    });

    cy.get('[data-test="routing-rule"]').within(() => {
      findByLabel("IF").select("question 1");
    });

    cy
      .get("[data-test='options-selector']")
      .should("contain", "A")
      .should("contain", "B")
      .should("contain", "C")
      .within(() => cy.get("input").should("have.length", 3));
  });

  it("builds a large questionnaire.", () => {
    addQuestionPage();
    typeIntoDraftEditor("[data-testid='txt-question-title']", "question 2");
    buildMultipleChoiceAnswer(["D", "E", "F"]);

    addSection();

    addQuestionPage();
    typeIntoDraftEditor("[data-testid='txt-question-title']", "question 3");
    buildMultipleChoiceAnswer(["G", "H", "I"]);

    addQuestionPage();
    typeIntoDraftEditor("[data-testid='txt-question-title']", "question 4");
    buildMultipleChoiceAnswer(["J", "K", "L"]);
  });

  it("builds a series of Or'd rules", () => {
    cy.contains("question 3").click();
    cy.get("[data-test='tabs-nav']").within(() => {
      cy.contains("Routing").click();
    });

    cy.get("[data-test='btn-add-rule']").click();

    cy.get('[data-test="routing-rule"]');

    buildMultipleRouting(
      ["question 1", "question 2", "question 3"],
      ["A", "D", "G"],
      "Or"
    );

    cy
      .get('[data-test="btn-delete"]')
      .first()
      .click();

    cy.get('[data-test="routing-rule"]').should("have.length", 3);

    cy
      .get("[data-test='options-selector']")
      .first()
      .within(() => {
        cy
          .get("input")
          .first()
          .should("be.checked");
      });
    cy
      .get("[data-test='options-selector']")
      .eq(1)
      .within(() => {
        cy
          .get("input")
          .first()
          .should("be.checked");
      });
    cy
      .get("[data-test='options-selector']")
      .last()
      .within(() => {
        cy
          .get("input")
          .first()
          .should("be.checked");
      });
  });

  it("can't route based on a future question", () => {
    findByLabel("IF").within(() => {
      cy.contains("question 4").should("not.exist");
    });
  });

  it("updates the options when a new question is selected", () => {
    cy
      .get("[data-test='options-selector']")
      .first()
      .contains("A");

    findByLabel("IF")
      .first()
      .select("question 2");

    cy
      .get("[data-test='options-selector']")
      .first()
      .contains("D");
  });

  it("can't route to a previous question", () => {
    cy
      .get("[data-test='result-selector']")
      .first()
      .within(() => {
        cy.contains("question 1").should("not.exist");
      });
  });

  it("deletes all current rules and builds an And'd rule set", () => {
    cy
      .get('[data-test="btn-delete"]')
      .first()
      .click();

    cy.get('[data-test="routing-condition"]').should("have.length", 2);

    cy
      .get('[data-test="btn-delete"]')
      .first()
      .click();

    cy
      .get('[data-test="routing-rule"]')
      .last()
      .within(() => {
        cy.get('[data-test="btn-add"]').click();
        cy.get('[data-test="btn-add"]').click();
      });

    cy.get('[data-test="routing-rule"]').should("have.length", 1);
    cy.get('[data-test="routing-condition"]').should("have.length", 3);
  });

  it("can change the destination to another page and the else to the Summery", () => {
    cy.url().then(url => {
      const pageId = last(url.match(/(\d+)/g)) - 1;
      const destinationValue = `{"absoluteDestination":{"destinationType":"QuestionPage","destinationId":"${pageId}"}}`;
      cy
        .get('[data-test="result-selector"]')
        .first()
        .select(`Page Title`)
        .should("have.value", destinationValue);
    });

    cy
      .get('[data-test="result-selector"]')
      .first()
      .select("Summary")
      .should(
        "have.value",
        '{"logicalDestination":{"destinationType":"EndOfQuestionnaire"}}'
      );
  });

  it("should change rule if the dependent question is removed", () => {
    cy
      .get('[data-test="btn-remove"]')
      .first()
      .click()
      .then(() => {
        cy
          .get('[data-test="btn-remove"]')
          .last()
          .click();
      });

    cy.url().then(url => {
      cy
        .get('[data-test="page-item"]')
        .first()
        .click();

      cy.get('[data-test="tabs-nav"]').within(() => {
        cy.contains("Builder").click();
      });

      cy
        .get('[data-test="btn-delete"]')
        .click()
        .then(() => {
          cy.get('[data-test="btn-delete-modal"]').click();
        });

      cy.visit(url);
      cy.contains("Sign in as Guest").click();
    });

    findByLabel("IF")
      .first()
      .within(() => {
        cy.contains("question 1").should("not.exist");
      });
  });
});
