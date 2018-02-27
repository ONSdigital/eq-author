import {
  setQuestionnaireSettings,
  addAnswerType,
  assertHash,
  typeIntoDraftEditor
} from "../utils";

describe("eq-author", () => {
  it("Should redirect to the sign-in page", () => {
    cy.visit("/");
    cy.url().should("include", "sign-in");
  });

  it("Should allow user to log in as guest", () => {
    cy.contains("Sign in as Guest").click();
    cy.get("h1").should("contain", "Your Questionnaires");
  });

  it("can create a questionnaire", () => {
    cy.get("[data-test='create-questionnaire']").click();
    setQuestionnaireSettings("My Questionnaire Title");
    cy.hash().should("match", /questionnaire\/(\d+)\/design\//);
  });

  it("should show questionnaire on listing page", () => {
    cy.get(`[data-test="logo"]`).click();

    cy.get(`[data-test="username"]`).then($name => {
      cy
        .get("tbody tr")
        .last()
        .should("contain", "My Questionnaire Title")
        .and("contain", $name.text())
        .find("a")
        .click();
    });
  });

  it("can edit section title", () => {
    typeIntoDraftEditor("[data-testid='txt-section-title']", "hello world");
    cy.get("[data-test='side-nav']").should("contain", "hello world");
  });

  it("can edit page title", () => {
    typeIntoDraftEditor("[data-testid='txt-question-title']", "goodbye world");
    cy.get("[data-test='side-nav']").should("contain", "goodbye world");
  });

  it("can create a new page", () => {
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

  it("can delete a page", () => {
    cy.get("[data-test='btn-delete']").click();
    cy.get("[data-test='btn-delete-modal']").click();
    cy.get("[data-test='page-item']").should("have.length", 1);
  });

  it("can change the questionnaire title", () => {
    cy.get(`[data-test="settings-btn"]`).click();
    setQuestionnaireSettings("Test Questionnaire");
    cy.get("[data-test='breadcrumb']").should("contain", "Test Questionnaire");
  });

  it("can create a new section", () => {
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

  it("can delete a section", () => {
    cy.get("[data-test='side-nav']").within(() => {
      cy.get("[data-test='btn-delete-section']").should("have.length", 2);

      cy
        .get("[data-test='btn-delete-section']")
        .first()
        .click();

      cy.get("[data-test='btn-delete-section']").should("have.length", 1);
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
    cy.get("[data-test='btn-delete-answer']").click();
    cy.get("[data-test='btn-delete-answer']").should("not.exist");
  });

  it("should create a new page when deleting only page in section", () => {
    let prevHash;

    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        cy.get("[data-test='btn-delete']").click();
        cy.get("[data-test='btn-delete-modal']").click();
      })
      .then(() => {
        assertHash(prevHash, {
          questionnaireId: true,
          sectionId: true,
          pageId: false
        });
      });
  });

  it("should create a new section when deleting only section", () => {
    let prevHash;

    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        cy.get("[data-test='btn-delete-section']").click();
      })
      .then(() => {
        assertHash(prevHash, {
          questionnaireId: true,
          sectionId: false,
          pageId: false
        });
      });
  });
});
