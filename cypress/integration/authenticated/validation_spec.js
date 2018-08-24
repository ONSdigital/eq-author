import { CURRENCY, NUMBER } from "../../../src/constants/answer-types";

import {
  addAnswerType,
  addQuestionnaire,
  removeAnswer,
  testId
} from "../../utils";

const toggleMinValue = () => {
  cy.get("@minValueToggle").within(() => {
    cy.get('[type="checkbox"]').should("not.be.checked");
  });
  cy.get("@minValueToggle").click();
  cy.get("@minValueToggle").within(() => {
    cy.get('[type="checkbox"]').should("be.checked");
  });
};

const setMinValueInput = () => {
  cy.get("@minValueToggle").click();
  cy.get(testId("min-value-input")).as("minValueInput");
  cy
    .get("@minValueInput")
    .type("3")
    .should("have.value", "3");
};

const toggleMinValueInclude = () => {
  cy.get("@minValueToggle").click();
  cy.get("#min-value-include").as("minValueInclude");
  cy.get("@minValueInclude").should("not.be.checked");
  cy.get("@minValueInclude").click({ force: true });
  cy.get("@minValueInclude").should("be.checked");
};

describe("Answer Validation", () => {
  it("Can create a questionnaire", () => {
    cy.visit("/");
    cy.login();
    addQuestionnaire("Answer Validation Question Test");
  });
  describe("Number", () => {
    beforeEach(() => {
      addAnswerType(NUMBER);
      cy.get(testId("sidebar-button-min-value")).as("minValue");
      cy.get("@minValue").should("be.visible");
      cy.get("@minValue").click();
      cy.get(testId("validation-view-toggle")).within(() => {
        cy.get('[role="switch"]').as("minValueToggle");
      });
    });
    describe("Min Value", () => {
      it("Can toggle on/off", () => {
        toggleMinValue();
      });
      it("Can set input value", () => {
        setMinValueInput();
      });
      it("Can toggle include/exclude", () => {
        toggleMinValueInclude();
      });
      it("Can retain input value after on/off toggle", () => {
        setMinValueInput();
        cy.get("@minValueToggle").click(); //Turn off
        cy.get("@minValueToggle").click(); //Turn on
        cy.get("@minValueInput").should("have.value", "3");
      });
    });
    afterEach(() => {
      removeAnswer({ force: true });
    });
  });
  describe("Currency", () => {
    beforeEach(() => {
      addAnswerType(CURRENCY);
      cy.get(testId("sidebar-button-min-value")).as("minValue");
      cy.get("@minValue").should("be.visible");
      cy.get("@minValue").click();
      cy.get(testId("validation-view-toggle")).within(() => {
        cy.get('[role="switch"]').as("minValueToggle");
      });
    });
    describe("Min Value", () => {
      it("Can toggle on/off", () => {
        toggleMinValue();
      });
      it("Can set input value", () => {
        setMinValueInput();
      });
      it("Can toggle include/exclude", () => {
        toggleMinValueInclude();
      });
      it("Can retain input value after on/off toggle", () => {
        setMinValueInput();
        cy.get("@minValueToggle").click(); //Turn off
        cy.get("@minValueToggle").click(); //Turn on
        cy.get("@minValueInput").should("have.value", "3");
      });
    });
    afterEach(() => {
      removeAnswer({ force: true });
    });
  });
});
