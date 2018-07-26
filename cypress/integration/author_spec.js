import {
  addQuestionnaire,
  answerTypes,
  setQuestionnaireSettings,
  addAnswerType,
  assertHash,
  typeIntoDraftEditor,
  findByLabel,
  addSection,
  addQuestionPage,
  testId
} from "../utils";
import { times, includes } from "lodash";
import { Routes } from "../../src/utils/UrlUtils";

describe("eq-author", () => {
  it("Should redirect to the sign-in page", () => {
    cy.visit("/");
    cy.url().should("include", "sign-in");
  });

  it("Should allow user to log in as guest", () => {
    cy.contains("Sign in as Guest").click();
    cy.get("h1").should("contain", "Your Questionnaires");
  });

  it("Can create a questionnaire", () => {
    addQuestionnaire("My Questionnaire Title");
  });

  it("Should show questionnaire on listing page", () => {
    cy.get(testId("questionnaire-title")).contains("My Questionnaire Title");

    cy.get(testId("logo")).click();

    cy.get(testId("username")).then($name => {
      cy
        .get("tbody tr")
        .first()
        .should("contain", "My Questionnaire Title")
        .and("contain", $name.text())
        .find("a")
        .click();
    });
  });

  it("Can edit page title", () => {
    cy.get(testId("page-item")).click();
    typeIntoDraftEditor(
      testId("txt-question-title", "testid"),
      "goodbye world"
    );
    cy.get(testId("side-nav")).should("contain", "goodbye world");
  });

  it("Can create a new page", () => {
    let prevHash;

    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        addQuestionPage();
      })
      .then(() => {
        assertHash({
          previousPath: Routes.PAGE,
          previousHash: prevHash,
          currentPath: Routes.PAGE,
          equality: {
            questionnaireId: true,
            sectionId: true,
            pageId: false
          }
        });
      });

    cy.get(testId("page-item")).should("have.length", 2);
  });

  it("Can edit question guidance", () => {
    const guidance = "this is some guidance";
    typeIntoDraftEditor(testId("txt-question-guidance", "testid"), guidance);

    cy
      .get(testId("page-item"))
      .first()
      .click();

    cy
      .get(testId("page-item"))
      .last()
      .click();

    cy
      .get(testId("txt-question-guidance", "testid"))
      .should("contain", guidance);
  });

  it("Can delete a page", () => {
    cy.get(testId("btn-delete")).click();

    cy.get(testId("delete-confirm-modal", "testid")).within(() => {
      cy
        .get("button")
        .contains("Delete")
        .click();
    });

    cy.get(testId("page-item")).should("have.length", 1);
  });

  it("Can change the questionnaire title", () => {
    cy.get(testId("settings-btn")).click();
    setQuestionnaireSettings("Test Questionnaire");
    cy
      .get(testId("questionnaire-title"))
      .should("contain", "Test Questionnaire");
  });

  it("Can create a new section", () => {
    let prevHash;

    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        addSection();
      })
      .then(() => {
        assertHash({
          previousPath: Routes.PAGE,
          previousHash: prevHash,
          currentPath: Routes.SECTION,
          equality: {
            questionnaireId: true,
            sectionId: false
          }
        });
      });
  });

  it("Can navigate to a section", () => {
    let prevHash;

    cy.hash().then(hash => {
      prevHash = hash;
    });
    cy
      .get(testId("nav-section-link"))
      .first()
      .click()
      .then(() => {
        assertHash({
          previousPath: Routes.SECTION,
          previousHash: prevHash,
          currentPath: Routes.SECTION,
          equality: {
            questionnaireId: true,
            sectionId: false
          }
        });
      });
  });

  it("Can edit section title and description", () => {
    typeIntoDraftEditor(
      testId("txt-section-title", "testid"),
      "my new section"
    );
    cy.get(testId("nav-section-link")).should("contain", "my new section");

    typeIntoDraftEditor(
      testId("txt-section-description", "testid"),
      "section description"
    );

    cy
      .get(testId("txt-section-description", "testid"))
      .should("contain", "section description");
  });

  it("Can delete a section", () => {
    let prevHash;

    cy.hash().then(hash => {
      prevHash = hash;
    });

    cy.get(testId("btn-delete")).click();
    cy.get(testId("delete-confirm-modal", "testid")).within(() => {
      cy
        .get("button")
        .contains("Delete")
        .click();
    });

    cy.then(() => {
      assertHash({
        previousPath: Routes.SECTION,
        previousHash: prevHash,
        currentPath: Routes.PAGE,
        equality: {
          questionnaireId: true,
          sectionId: false,
          pageId: false
        }
      });
    });
  });

  it("Can create checkboxes", () => {
    addAnswerType("Checkbox");
    cy.get(testId("btn-add-option")).click();
    cy.get(testId("option-label")).should("have.length", 2);
    cy
      .get(testId("option-label"))
      .first()
      .type("Checkbox label");
    cy
      .get(testId("option-description"))
      .first()
      .type("Checkbox description");
  });

  it("Can delete checkboxes", () => {
    cy
      .get(testId("btn-delete-option"))
      .last()
      .click();
    cy.get(testId("option-label")).should("have.length", 1);
    cy.get(testId("btn-delete-answer")).click();
    cy.get(testId("btn-delete-answer")).should("not.exist");
  });

  it("Can create radio buttons", () => {
    addAnswerType("Radio");
    cy.get(testId("btn-add-option")).click();
    cy.get(testId("option-label")).should("have.length", 3);
    cy
      .get(testId("option-label"))
      .first()
      .type("Radio label");
    cy
      .get(testId("option-description"))
      .first()
      .type("Radio description");
  });

  it("Can delete radio buttons", () => {
    cy
      .get(testId("btn-delete-option"))
      .last()
      .click();
    cy.get(testId("option-label")).should("have.length", 2);
    cy.get(testId("btn-delete-answer")).click();
    cy.get(testId("btn-delete-answer")).should("not.exist");
  });

  it("Can create and delete the different types of textbox", () => {
    answerTypes.forEach(answerType => {
      addAnswerType(answerType);
      cy.get("[data-test='txt-answer-label']").type(answerType + " label");
      if (includes(["Currency"], answerType)) {
        cy
          .get("[data-test='txt-answer-description']")
          .type(answerType + " description");
      }
      cy.get("[data-test='btn-delete-answer']").click();
      cy.get("[data-test='btn-delete-answer']").should("not.exist");
    });
  });

  it("Can create and delete dates", () => {
    addAnswerType("Date");
    cy.get(testId("date-answer-label")).type("Date label");
    cy.get(testId("btn-delete-answer")).click();
    cy.get(testId("btn-delete-answer")).should("not.exist");
  });

  it("Can create and delete date ranges", () => {
    addAnswerType("Daterange");

    cy.get(testId("date-range-editor")).within(() => {
      cy
        .get(testId("date-answer-label"))
        .first()
        .click()
        .type("Date Range label");

      cy
        .get(testId("date-answer-label"))
        .last()
        .click()
        .type("Date Range label 2");
    });

    cy.get(testId("btn-delete-answer")).click();
    cy.get(testId("btn-delete-answer")).should("not.exist");
  });

  it("Should create a new page when deleting only page in section", () => {
    let prevHash;

    cy.hash().then(hash => {
      prevHash = hash;
    });

    cy.get(testId("btn-delete")).click();
    cy.get(testId("delete-confirm-modal", "testid")).within(() => {
      cy
        .get("button")
        .contains("Delete")
        .click();
    });

    cy.then(() => {
      assertHash({
        previousPath: Routes.PAGE,
        previousHash: prevHash,
        currentPath: Routes.PAGE,
        equality: {
          questionnaireId: true,
          sectionId: true,
          pageId: false
        }
      });
    });
  });

  it("Should create a new section when deleting only section", () => {
    let prevHash;

    cy
      .get(testId("nav-section-link"))
      .first()
      .click();

    cy.hash().then(hash => {
      prevHash = hash;
    });

    cy.get(testId("btn-delete")).click();
    cy.get(testId("delete-confirm-modal", "testid")).within(() => {
      cy
        .get("button")
        .contains("Delete")
        .click();
    });

    cy.then(() => {
      assertHash({
        previousPath: Routes.SECTION,
        previousHash: prevHash,
        currentPath: Routes.SECTION,
        equality: {
          questionnaireId: true,
          sectionId: false
        }
      });
    });
  });

  it("Can move pages within a section", () => {
    cy
      .get(testId("page-item"))
      .first()
      .click();
    typeIntoDraftEditor(testId("txt-question-title", "testid"), `Page 0`);

    let pageCount = 1;

    times(2, i => {
      addQuestionPage();

      // this causes cypress to wait until the assertion is correct,
      // which avoids a race condition where cypress will type into
      // a matching text box on the prev page, while animation is underway
      pageCount++;
      cy.get(testId("page-item")).should("have.length", pageCount);

      typeIntoDraftEditor(
        testId("txt-question-title", "testid"),
        `Page ${i + 1}`
      );
    });

    cy.get(testId("btn-move")).click();

    findByLabel("Position").click();
    cy.get(testId("position-modal", "testid")).within(() => {
      findByLabel("Page 0").click();
      cy.get("form").submit();
    });

    cy
      .get(testId("page-item"))
      .first()
      .should("contain", "Page 2");
  });

  it("Can move pages between sections", () => {
    addSection();

    cy
      .get(testId("page-item"))
      .contains("Page 2")
      .click();

    cy.get(testId("btn-move")).click();

    findByLabel("Section").click();
    cy.get(testId("section-modal", "testid")).within(() => {
      cy
        .get("label")
        .last()
        .click();
      cy.get("form").submit();
    });

    findByLabel("Position").click();
    cy.get(testId("position-modal", "testid")).within(() => {
      cy.get("form").submit();
    });

    cy
      .get(testId("section-item"))
      .last()
      .find(testId("page-item"))
      .first()
      .should("contain", "Page 2");
  });

  describe('Checkbox/Radio with "other" option', () => {
    it("should goto questionnaire design page", () => {
      cy.visit("/");
      cy.contains("Sign in as Guest").click();
      cy.get(testId("create-questionnaire")).click();
      setQuestionnaireSettings("My Questionnaire Title");
    });

    it('should add an "other" answer', () => {
      addAnswerType("Checkbox");
      cy.get(testId("btn-add-option-menu")).click();
      cy.get(testId("btn-add-option-other")).click();
      cy.get(testId("option-label")).should("have.length", 2);
      cy.get(testId("other-answer")).should("have.length", 1);
    });

    it("should update the other option and answer values", () => {
      cy
        .get(testId("option-label"))
        .last()
        .type("Other label");
      cy
        .get(testId("option-description"))
        .last()
        .type("Other description");
      cy
        .get(testId("txt-answer-label"))
        .last()
        .type("Text answer label");
      cy
        .get(testId("option-label"))
        .first()
        .click();
    });

    it('should remove the "other" option.', () => {
      cy
        .get(testId("btn-delete-option"))
        .last()
        .click();
      cy.get(testId("option-label")).should("have.length", 1);
      cy.get(testId("other-answer")).should("have.length", 0);
    });
  });
});
