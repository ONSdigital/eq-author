/* eslint-disable  camelcase */
import { CURRENCY, DATE, NUMBER } from "../../../src/constants/answer-types";

import {
  addAnswerType,
  addQuestionnaire,
  removeAnswer,
  testId,
  toggleCheckboxOn,
  toggleCheckboxOff
} from "../../utils";

import createQuestionnaire from "../../fixtures/createQuestionnaire";
import GetQuestionPage from "../../fixtures/GetQuestionPage";
import GetQuestionnaire from "../../fixtures/GetQuestionnaire";
import GetQuestionnaire_Piping from "../../fixtures/GetQuestionnaire_Piping";
import createDateAnswer from "../../fixtures/answers/createDateAnswer";
import UpdateQuestionPage from "../../fixtures/duplicatePage/UpdateQuestionPage";
import ToggleValidationRule from "../../fixtures/answers/ToggleValidationRule";
import {
  updateValidationRuleOffsetValue,
  updateValidationRuleOffsetUnit,
  updateValidationRuleRelativePosition,
  updateValidationRuleCustomDate
} from "../../fixtures/answers/date/updateValidationRule";

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
  describe("Date", () => {
    let count = 0;
    before(() => {
      cy.visitStubbed("#/questionnaire/1/1/1/design", {
        createQuestionnaire,
        GetQuestionPage,
        GetQuestionnaire,
        GetQuestionnaire_Piping,
        createAnswer: createDateAnswer,
        UpdateQuestionPage,
        ToggleValidationRule,
        updateValidationRule: () => {
          switch (count++) {
            case 0:
              return updateValidationRuleOffsetValue;
            case 1:
              return updateValidationRuleOffsetUnit;
            case 2:
              return updateValidationRuleRelativePosition;
            case 3:
              return updateValidationRuleCustomDate;
            default:
              throw new Error("Call not expected");
          }
        }
      });
      cy.login();
      addAnswerType(DATE);
    });
    describe("Earliest date", () => {
      it("should exist in the side bar", () => {
        cy.get(testId("sidebar-button-earliest-date")).should("be.visible");
      });

      it("should show the date validation modal", () => {
        cy.get(testId("sidebar-button-earliest-date")).as("earliestDate");
        cy.get("@earliestDate").click();
        cy.get(testId("sidebar-title")).contains("Date validation");
      });

      it("can be toggled on", () => {
        cy.get(testId("earliest-date-validation")).contains(
          "Earliest date is disabled"
        );
        cy.get(testId("validation-view-toggle")).within(() => {
          cy.get('[role="switch"]').as("earliestDateToggle");
        });
        toggleCheckboxOn("@earliestDateToggle");
        cy.get(testId("earliest-date-validation")).should(
          "not.contain",
          "Earliest date is disabled"
        );
      });

      it("should update the offset value", () => {
        cy.get('[name="offset.value"]')
          .type("5")
          .blur()
          .should("have.value", "05");
      });

      it("should update the offset unit", () => {
        cy.get('[name="offset.unit"]')
          .select("Months")
          .blur()
          .should("have.value", "Months");
      });

      it("should update the relativePosition", () => {
        cy.get(testId("relative-position-select"))
          .select("After")
          .blur();
        cy.get(testId("relative-position-select")).should(
          "have.value",
          "After"
        );
      });

      it("should update the custom value", () => {
        cy.get('[type="date"]')
          .type("1985-09-14")
          .blur()
          .should("have.value", "1985-09-14");
      });
    });
  });
});
