/* eslint-disable  camelcase */
import { CURRENCY, DATE, NUMBER } from "../../../src/constants/answer-types";

import {
  addAnswerType,
  addQuestionPage,
  addQuestionnaire,
  removeAnswer,
  testId,
  toggleCheckboxOn,
  toggleCheckboxOff,
  selectFirstAnswerFromContentPicker
} from "../../utils";

import createQuestionnaire from "../../fixtures/createQuestionnaire";
import GetQuestionPage from "../../fixtures/GetQuestionPage";
import GetQuestionnaire from "../../fixtures/GetQuestionnaire";
import GetQuestionnaire_Piping from "../../fixtures/GetQuestionnaire_Piping";
import createDateAnswer from "../../fixtures/answers/createDateAnswer";
import UpdateQuestionPage from "../../fixtures/duplicatePage/UpdateQuestionPage";
import {
  toggleEarliestDate,
  toggleLatestDate
} from "../../fixtures/answers/ToggleValidationRule";
import {
  updateValidationRuleOffsetValue,
  updateValidationRuleOffsetUnit,
  updateValidationRuleRelativePosition,
  updateValidationRuleCustomDate
} from "../../fixtures/answers/date/updateValidationRule";

const setPreviousAnswer = sidebar => {
  cy.get(testId("btn-done")).click();
  addQuestionPage();
  addAnswerType("Number");
  cy.get(sidebar)
    .last()
    .click();
  cy.get(testId("validation-view-toggle")).within(() => {
    cy.get("[role='switch']").as("viewToggle");
  });
  toggleCheckboxOn("@viewToggle");
  cy.get("button")
    .contains("Previous answer")
    .click();
  cy.get(testId("content-picker-select")).as("previousAnswer");
  cy.get("@previousAnswer").contains("No answer selected");
  cy.get("@previousAnswer").click();
  selectFirstAnswerFromContentPicker();
  cy.get("@previousAnswer").contains("Validation Answer");
  cy.get(sidebar).contains("Validation Answer");
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
      cy.get(testId("txt-answer-label")).type("Validation Answer");
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
      it("Can set previous answer", () => {
        setPreviousAnswer("@maxValue");
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
      it("Can set previous answer", () => {
        setPreviousAnswer("@maxValue");
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
    const dateValidationStubs = {
      createQuestionnaire,
      GetQuestionPage,
      GetQuestionnaire,
      GetQuestionnaire_Piping,
      createAnswer: createDateAnswer,
      UpdateQuestionPage
    };

    describe("Earliest date", () => {
      let count = 0;
      before(() => {
        cy.visitStubbed(
          "#/questionnaire/1/1/1/design",
          Object.assign({}, dateValidationStubs, {
            ToggleValidationRule: toggleEarliestDate,
            updateValidationRule: () => {
              switch (count++) {
                case 0:
                  return updateValidationRuleOffsetValue(
                    "1",
                    "EarliestDateValidationRule"
                  );
                case 1:
                  return updateValidationRuleOffsetUnit(
                    "1",
                    "EarliestDateValidationRule"
                  );
                case 2:
                  return updateValidationRuleRelativePosition(
                    "1",
                    "EarliestDateValidationRule",
                    "After"
                  );
                case 3:
                  return updateValidationRuleCustomDate(
                    "1",
                    "EarliestDateValidationRule"
                  );
                default:
                  throw new Error("Call not expected");
              }
            }
          })
        );
        cy.login();
        addAnswerType(DATE);
      });
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
          .type("{backspace}5")
          .blur()
          .should("have.value", "5");
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

    describe("Latest date", () => {
      let count = 0;
      before(() => {
        cy.visitStubbed(
          "#/questionnaire/1/1/1/design",
          Object.assign({}, dateValidationStubs, {
            ToggleValidationRule: toggleLatestDate,
            updateValidationRule: () => {
              switch (count++) {
                case 0:
                  return updateValidationRuleOffsetValue(
                    "2",
                    "LatestDateValidationRule"
                  );
                case 1:
                  return updateValidationRuleOffsetUnit(
                    "2",
                    "LatestDateValidationRule"
                  );
                case 2:
                  return updateValidationRuleRelativePosition(
                    "2",
                    "LatestDateValidationRule",
                    "Before"
                  );
                case 3:
                  return updateValidationRuleCustomDate(
                    "2",
                    "LatestDateValidationRule"
                  );
                default:
                  throw new Error("Call not expected");
              }
            }
          })
        );
        cy.login();
        addAnswerType(DATE);
      });
      it("should exist in the side bar", () => {
        cy.get(testId("sidebar-button-latest-date")).should("be.visible");
      });

      it("should show the date validation modal", () => {
        cy.get(testId("sidebar-button-latest-date")).click();
        cy.get(testId("sidebar-title")).contains("Date validation");
      });

      it("can be toggled on", () => {
        cy.get(testId("latest-date-validation")).contains(
          "Latest date is disabled"
        );
        cy.get(testId("validation-view-toggle")).within(() => {
          cy.get('[role="switch"]').as("latestDateToggle");
        });
        toggleCheckboxOn("@latestDateToggle");
        cy.get(testId("latest-date-validation")).should(
          "not.contain",
          "Latest date is disabled"
        );
      });

      it("should update the offset value", () => {
        cy.get('[name="offset.value"]')
          .type("{backspace}5")
          .blur()
          .should("have.value", "5");
      });

      it("should update the offset unit", () => {
        cy.get('[name="offset.unit"]')
          .select("Months")
          .blur()
          .should("have.value", "Months");
      });

      it("should update the relativePosition", () => {
        cy.get(testId("relative-position-select"))
          .select("Before")
          .blur();
        cy.get(testId("relative-position-select")).should(
          "have.value",
          "Before"
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
