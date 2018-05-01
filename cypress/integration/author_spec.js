import {
  setQuestionnaireSettings,
  addAnswerType,
  assertHash,
  typeIntoDraftEditor,
  findByLabel
} from "../utils";
import { times } from "lodash";

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
    cy.get("[data-test='create-questionnaire']").click();
    setQuestionnaireSettings("My Questionnaire Title");
    cy.hash().should("match", /questionnaire\/(\d+)\/design\//);
  });

  it("Should show questionnaire on listing page", () => {
    cy.get(`[data-test="logo"]`).click();

    cy.get(`[data-test="username"]`).then($name => {
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
    typeIntoDraftEditor("[data-testid='txt-question-title']", "goodbye world");
    cy.get("[data-test='side-nav']").should("contain", "goodbye world");
  });

  it("Can create a new page", () => {
    let prevHash;

    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        cy.get("[data-test='btn-add-page']").click();
      })
      .then(() => {
        assertHash(prevHash, {
          questionnaireId: true,
          sectionId: true,
          pageId: false
        });
      });

    cy.get("[data-test='page-item']").should("have.length", 2);
  });

  it("Can edit question guidance", () => {
    const guidance = "this is some guidance";
    typeIntoDraftEditor("[data-testid='txt-question-guidance']", guidance);

    cy
      .get(`[data-test="page-item"]`)
      .first()
      .click();

    cy
      .get(`[data-test="page-item"]`)
      .last()
      .click();

    cy.get("[data-testid='txt-question-guidance']").should("contain", guidance);
  });

  it("Can delete a page", () => {
    cy.get("[data-test='btn-delete']").click();

    cy.get(`[data-testid="delete-confirm-modal"]`).within(() => {
      cy
        .get("button")
        .contains("Delete")
        .click();
    });

    cy.get("[data-test='page-item']").should("have.length", 1);
  });

  it("Can change the questionnaire title", () => {
    cy.get(`[data-test="settings-btn"]`).click();
    setQuestionnaireSettings("Test Questionnaire");
    cy
      .get("[data-test='questionnaire-title']")
      .should("contain", "Test Questionnaire");
  });

  it("Can create a new section", () => {
    let prevHash;

    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        cy.get("[data-test='btn-add-section']").click();
      })
      .then(() => {
        assertHash(prevHash, {
          questionnaireId: true,
          sectionId: false,
          pageId: false
        });
      });
  });

  it("Can navigate to a section", () => {
    let prevHash;

    cy.hash().then(hash => {
      prevHash = hash;
    });
    cy
      .get(`[data-test="nav-section-link"]`)
      .first()
      .click()
      .then(() => {
        assertHash(prevHash, {
          questionnaireId: true,
          sectionId: false,
          pageId: true
        });
      });
  });

  it("Can edit section title and description", () => {
    typeIntoDraftEditor("[data-testid='txt-section-title']", "my new section");
    cy
      .get("[data-test='nav-section-link']")
      .should("contain", "my new section");

    typeIntoDraftEditor(
      "[data-testid='txt-section-description']",
      "section description"
    );

    cy
      .get("[data-testid='txt-section-description']")
      .should("contain", "section description");
  });

  it("Can delete a section", () => {
    let prevHash;

    cy.hash().then(hash => {
      prevHash = hash;
    });

    cy.get("[data-test='btn-delete']").click();
    cy.get(`[data-testid="delete-confirm-modal"]`).within(() => {
      cy
        .get("button")
        .contains("Delete")
        .click();
    });

    cy.then(() => {
      assertHash(prevHash, {
        questionnaireId: true,
        sectionId: false,
        pageId: false
      });
    });
  });

  it("Can create checkboxes", () => {
    addAnswerType("Checkbox");
    cy.get("[data-test='btn-add-option']").click();
    cy.get("[data-test='option-label']").should("have.length", 2);
    cy
      .get("[data-test='option-label']")
      .first()
      .type("Checkbox label");
    cy
      .get("[data-test='option-description']")
      .first()
      .type("Checkbox description");
  });

  it("Can delete checkboxes", () => {
    cy
      .get("[data-test='btn-delete-option']")
      .last()
      .click();
    cy.get("[data-test='option-label']").should("have.length", 1);
    cy.get("[data-test='btn-delete-answer']").click();
    cy.get("[data-test='btn-delete-answer']").should("not.exist");
  });

  it("Can create radio buttons", () => {
    addAnswerType("Radio");
    cy.get("[data-test='btn-add-option']").click();
    cy.get("[data-test='option-label']").should("have.length", 3);
    cy
      .get("[data-test='option-label']")
      .first()
      .type("Radio label");
    cy
      .get("[data-test='option-description']")
      .first()
      .type("Radio description");
  });

  it("Can delete radio buttons", () => {
    cy
      .get("[data-test='btn-delete-option']")
      .last()
      .click();
    cy.get("[data-test='option-label']").should("have.length", 2);
    cy.get("[data-test='btn-delete-answer']").click();
    cy.get("[data-test='btn-delete-answer']").should("not.exist");
  });

  it("Can create and delete the different types of textbox", () => {
    const answerTypes = ["Text", "Textarea", "Currency", "Number"];

    answerTypes.forEach(answerType => {
      addAnswerType(answerType);
      cy.get("[data-test='txt-answer-label']").type(answerType + " label");
      cy
        .get("[data-test='txt-answer-description']")
        .type(answerType + " description");
      cy.get("[data-test='btn-delete-answer']").click();
      cy.get("[data-test='btn-delete-answer']").should("not.exist");
    });
  });

  it("Can create and delete dates", () => {
    addAnswerType("Date");
    cy.get("[data-test='date-answer-label']").type("Date label");
    cy.get("[data-test='btn-delete-answer']").click();
    cy.get("[data-test='btn-delete-answer']").should("not.exist");
  });

  it("Can create and delete date ranges", () => {
    addAnswerType("Date range");
    cy.get("[data-test='date-answer-label']").type("Date Range label");
    cy
      .get("[data-test='date-answer-secondary-label']")
      .type("Date Range label 2");
    cy.get("[data-test='btn-delete-answer']").click();
    cy.get("[data-test='btn-delete-answer']").should("not.exist");
  });

  it("Should create a new page when deleting only page in section", () => {
    let prevHash;

    cy.hash().then(hash => {
      prevHash = hash;
    });

    cy.get("[data-test='btn-delete']").click();
    cy.get(`[data-testid="delete-confirm-modal"]`).within(() => {
      cy
        .get("button")
        .contains("Delete")
        .click();
    });

    cy.then(() => {
      assertHash(prevHash, {
        questionnaireId: true,
        sectionId: true,
        pageId: false
      });
    });
  });

  it("Should create a new section when deleting only section", () => {
    let prevHash;

    cy
      .get(`[data-test="nav-section-link"]`)
      .first()
      .click();

    cy.hash().then(hash => {
      prevHash = hash;
    });

    cy.get("[data-test='btn-delete']").click();
    cy.get(`[data-testid="delete-confirm-modal"]`).within(() => {
      cy
        .get("button")
        .contains("Delete")
        .click();
    });

    cy.then(() => {
      assertHash(prevHash, {
        questionnaireId: true,
        sectionId: false,
        pageId: true
      });
    });
  });

  it("can move pages within a section", () => {
    cy
      .get(`[data-test="page-item"]`)
      .first()
      .click();
    typeIntoDraftEditor("[data-testid='txt-question-title']", `Page 0`);

    times(2, i => {
      cy
        .get("[data-test='btn-add-page']")
        .click()
        .wait(100); // this is needed for real API for some reason

      typeIntoDraftEditor(
        "[data-testid='txt-question-title']",
        `Page ${i + 1}`
      );
    });

    cy.get(`[data-test="btn-move-page"]`).click();

    findByLabel("Position").click();
    cy.get(`[data-testid="position-modal"]`).within(() => {
      findByLabel("Page 0").click();
      cy.get("form").submit();
    });

    cy
      .get(`[data-test="page-item"]`)
      .first()
      .should("contain", "Page 2");
  });

  it("can move pages between sections", () => {
    cy.get("[data-test='btn-add-section']").click();

    cy
      .get(`[data-test="page-item"]`)
      .contains("Page 2")
      .click();

    cy.get(`[data-test="btn-move-page"]`).click();

    findByLabel("Section").click();
    cy.get(`[data-testid="section-modal"]`).within(() => {
      cy
        .get("label")
        .last()
        .click();
      cy.get("form").submit();
    });

    findByLabel("Position").click();
    cy.get(`[data-testid="position-modal"]`).within(() => {
      cy.get("form").submit();
    });

    cy
      .get(`[data-test="section-item"]`)
      .last()
      .find(`[data-test="page-item"]`)
      .first()
      .should("contain", "Page 2");
  });

  describe('Checkbox/Radio with "other" option', () => {
    it("should goto questionnaire design page", () => {
      cy.visit("/");
      cy.contains("Sign in as Guest").click();
      cy.get("[data-test='create-questionnaire']").click();
      setQuestionnaireSettings("My Questionnaire Title");
    });

    it('should add an "other" answer', () => {
      addAnswerType("Checkbox");
      cy.get("[data-test='btn-add-option-menu']").click();
      cy.get("[data-test='btn-add-option-other']").click();
      cy.get("[data-test='option-label']").should("have.length", 2);
      cy.get("[data-test='other-answer']").should("have.length", 1);
    });

    it("should update the other option and answer values", () => {
      cy
        .get("[data-test='option-label']")
        .last()
        .type("Other label");
      cy
        .get("[data-test='option-description']")
        .last()
        .type("Other description");
      cy
        .get("[data-test='txt-answer-label']")
        .last()
        .type("Text answer label");
      cy
        .get("[data-test='option-label']")
        .first()
        .click();
    });

    it('should remove the "other" option.', () => {
      cy
        .get("[data-test='btn-delete-option']")
        .last()
        .click();
      cy.get("[data-test='option-label']").should("have.length", 1);
      cy.get("[data-test='other-answer']").should("have.length", 0);
    });
  });
});
