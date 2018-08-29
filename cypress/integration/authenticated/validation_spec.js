import { CURRENCY, NUMBER } from "../../../src/constants/answer-types";

import {
  addAnswerType,
  addQuestionnaire,
  removeAnswer,
  testId,
  toggleCheckboxOn,
  toggleCheckboxOff
} from "../../utils";

describe("Answer Validation", () => {
  it("Can create a questionnaire", () => {
    cy.visit("/");
    cy.login();
    addQuestionnaire("Answer Validation Question Test");
  });
  describe("Number", () => {
    beforeEach(() => {
      addAnswerType(NUMBER);
    });
    describe("Min Value", () => {
      beforeEach(() => {
        cy.get(testId("sidebar-button-min-value")).as("minValue");
        cy.get("@minValue").should("be.visible");
        cy.get("@minValue").click();
        cy.get(testId("sidebar-title")).contains("Number validation");
        cy.get(testId("validation-view-toggle")).within(() => {
          cy.get('[role="switch"]').as("minValueToggle");
        });
      });
      it("Can toggle on/off", () => {
        toggleCheckboxOn("@minValueToggle");
        toggleCheckboxOff("@minValueToggle");
      });
      it("Can set input value", () => {
        toggleCheckboxOn("@minValueToggle");
        cy.get(testId("min-value-input"))
          .type("3")
          .should("have.value", "3");
      });
      it("Can toggle include/exclude", () => {
        toggleCheckboxOn("@minValueToggle");
        toggleCheckboxOn(testId("min-value-include"));
      });
      it("Can retain input value after on/off toggle", () => {
        toggleCheckboxOn("@minValueToggle");
        cy.get(testId("min-value-input")).type("3");
        toggleCheckboxOff("@minValueToggle");
        toggleCheckboxOn("@minValueToggle");
        cy.get(testId("min-value-input")).should("have.value", "3");
      });
    });

    describe("Max Value", () => {
      beforeEach(() => {
        cy.get(testId("sidebar-button-max-value")).as("maxValue");
        cy.get("@maxValue").should("be.visible");
        cy.get("@maxValue").click();
        cy.get(testId("sidebar-title")).contains("Number validation");
        cy.get(testId("validation-view-toggle")).within(() => {
          cy.get('[role="switch"]').as("maxValueToggle");
        });
      });
      it("Can toggle on/off", () => {
        toggleCheckboxOn("@maxValueToggle");
        toggleCheckboxOff("@maxValueToggle");
      });
      it("Can set input value", () => {
        toggleCheckboxOn("@maxValueToggle");
        cy.get(testId("max-value-input"))
          .type("3")
          .should("have.value", "3");
      });
      it("Can toggle include/exclude", () => {
        toggleCheckboxOn("@maxValueToggle");
        toggleCheckboxOn(testId("max-value-include"));
      });
      it("Can retain input value after on/off toggle", () => {
        toggleCheckboxOn("@maxValueToggle");
        cy.get(testId("max-value-input")).type("3");
        toggleCheckboxOff("@maxValueToggle");
        toggleCheckboxOn("@maxValueToggle");
        cy.get(testId("max-value-input")).should("have.value", "3");
      });
    });
    afterEach(() => {
      removeAnswer({ force: true });
    });
  });
  describe("Currency", () => {
    beforeEach(() => {
      addAnswerType(CURRENCY);
    });
    describe("Min Value", () => {
      beforeEach(() => {
        cy.get(testId("sidebar-button-min-value")).as("minValue");
        cy.get("@minValue").should("be.visible");
        cy.get("@minValue").click();
        cy.get(testId("sidebar-title")).contains("Currency validation");
        cy.get(testId("validation-view-toggle")).within(() => {
          cy.get('[role="switch"]').as("minValueToggle");
        });
      });
      it("Can toggle on/off", () => {
        toggleCheckboxOn("@minValueToggle");
        toggleCheckboxOff("@minValueToggle");
      });
      it("Can set input value", () => {
        toggleCheckboxOn("@minValueToggle");
        cy.get(testId("min-value-input"))
          .type("3")
          .should("have.value", "3");
      });
      it("Can toggle include/exclude", () => {
        toggleCheckboxOn("@minValueToggle");
        toggleCheckboxOn(testId("min-value-include"));
      });
      it("Can retain input value after on/off toggle", () => {
        toggleCheckboxOn("@minValueToggle");
        cy.get(testId("min-value-input")).type("3");
        toggleCheckboxOff("@minValueToggle");
        toggleCheckboxOn("@minValueToggle");
        cy.get(testId("min-value-input")).should("have.value", "3");
      });
    });

    describe("Max Value", () => {
      beforeEach(() => {
        cy.get(testId("sidebar-button-max-value")).as("maxValue");
        cy.get("@maxValue").should("be.visible");
        cy.get("@maxValue").click();
        cy.get(testId("sidebar-title")).contains("Currency validation");
        cy.get(testId("validation-view-toggle")).within(() => {
          cy.get('[role="switch"]').as("maxValueToggle");
        });
      });
      it("Can toggle on/off", () => {
        toggleCheckboxOn("@maxValueToggle");
        toggleCheckboxOff("@maxValueToggle");
      });
      it("Can set input value", () => {
        toggleCheckboxOn("@maxValueToggle");
        cy.get(testId("max-value-input"))
          .type("3")
          .should("have.value", "3");
      });
      it("Can toggle include/exclude", () => {
        toggleCheckboxOn("@maxValueToggle");
        toggleCheckboxOn(testId("max-value-include"));
      });
      it("Can retain input value after on/off toggle", () => {
        toggleCheckboxOn("@maxValueToggle");
        cy.get(testId("max-value-input")).type("3");
        toggleCheckboxOff("@maxValueToggle");
        toggleCheckboxOn("@maxValueToggle");
        cy.get(testId("max-value-input")).should("have.value", "3");
      });
    });

    afterEach(() => {
      removeAnswer({ force: true });
    });
  });
});
