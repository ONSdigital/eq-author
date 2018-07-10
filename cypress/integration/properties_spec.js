import { toUpper } from "lodash";

import {
  addAnswerType,
  addQuestionnaire,
  answerTypes,
  findByLabel,
  removeAnswer
} from "../utils";

describe("Answer Properties", () => {
  it("Can create a questionnaire", () => {
    cy.visit("/");
    cy.contains("Sign in as Guest").click();
    addQuestionnaire("Answer Properties Question Test");
  });
  describe("Title", () => {
    it("Should show answer type as uppercase text", () => {
      answerTypes.forEach(answerType => {
        addAnswerType(answerType);
        cy
          .get(`[data-test="properties-title-0"]`)
          .contains(toUpper(answerType));
        removeAnswer({ multiple: false });
      });
    });
    it("Should show numbered answer types", () => {
      const answerTypeTitles = [
        {
          type: "Number",
          title: "NUMBER"
        },
        {
          type: "Number",
          title: "NUMBER 2"
        },
        {
          type: "Text",
          title: "TEXTFIELD"
        },
        {
          type: "Number",
          title: "NUMBER 3"
        },
        {
          type: "Text",
          title: "TEXTFIELD"
        }
      ];

      answerTypeTitles.forEach(({ title, type }, index) => {
        addAnswerType(type);
        cy.get(`[data-test="properties-title-${index}"]`).contains(title);
      });

      removeAnswer({ multiple: true });
    });
  });
  describe("Answer Type", () => {
    describe("Text", () => {
      beforeEach(() => {
        addAnswerType("Text");
        cy.get('[data-test="properties-0"]').as("answerProperty");
        cy.get("@answerProperty").should("be.visible");
      });
      describe("Required", () => {
        const labelText = "Required";
        it("Should be first in list of properties", () => {
          cy.get("@answerProperty").within(() => {
            cy
              .get("label")
              .first()
              .contains(labelText);
          });
        });
        it("Should show 'Required' label", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText);
          });
        });
        it("Should default to off", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText).should("not.be.checked");
          });
        });
        it("Can toggle 'Required' property on and off", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText)
              .click({ force: true })
              .should("be.checked");
            findByLabel(labelText)
              .click({ force: true })
              .should("not.be.checked");
          });
        });
      });
      afterEach(() => {
        removeAnswer();
      });
    });
    describe("Number", () => {
      beforeEach(() => {
        addAnswerType("Number");
        cy.get('[data-test="properties-0"]').as("answerProperty");
        cy.get("@answerProperty").should("be.visible");
      });
      describe("Required", () => {
        const labelText = "Required";
        it("Should be first in list of properties", () => {
          cy.get("@answerProperty").within(() => {
            cy
              .get("label")
              .first()
              .contains("Required");
          });
        });
        it("Should show 'Required' label", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText);
          });
        });
        it("Should default to off", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText).should("not.be.checked");
          });
        });
        it("Can toggle 'Required' property on and off", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText)
              .click({ force: true })
              .should("be.checked");
            findByLabel(labelText)
              .click({ force: true })
              .should("not.be.checked");
          });
        });
      });
      describe("Decimals", () => {
        const labelText = "Decimals";
        it("Should show 'Decimals' label", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText);
          });
        });
        it("Should default to 0", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText).should("have.value", "0");
          });
        });
        it("Can change value", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText)
              .type("3")
              .should("have.value", "3");
          });
        });
      });
      afterEach(() => {
        removeAnswer();
      });
    });
    describe("Currency", () => {
      beforeEach(() => {
        addAnswerType("Currency");
        cy.get('[data-test="properties-0"]').as("answerProperty");
        cy.get("@answerProperty").should("be.visible");
      });
      describe("Required", () => {
        const labelText = "Required";
        it("Should be first in list of properties", () => {
          cy.get("@answerProperty").within(() => {
            cy
              .get("label")
              .first()
              .contains(labelText);
          });
        });
        it("Should show 'Required' label", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText);
          });
        });
        it("Should default to off", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText).should("not.be.checked");
          });
        });
        it("Can toggle 'Required' property on and off", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText)
              .click({ force: true })
              .should("be.checked");
            findByLabel(labelText)
              .click({ force: true })
              .should("not.be.checked");
          });
        });
      });
      describe("Decimals", () => {
        const labelText = "Decimals";
        it("Should show 'Decimals' label", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText);
          });
        });
        it("Should default to 0", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText).should("have.value", "0");
          });
        });
        it("Can change value", () => {
          cy.get("@answerProperty").within(() => {
            findByLabel(labelText)
              .type("3")
              .should("have.value", "3");
          });
        });
      });
      afterEach(() => {
        removeAnswer();
      });
    });
  });
});
