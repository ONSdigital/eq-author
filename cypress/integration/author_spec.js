import {
  createQuestionnaire,
  addAnswerType,
  assertHash
} from "../utils/index.js";

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
    createQuestionnaire("Title");
    cy.hash().should("match", /questionnaire\/(\d+)\/design\//);
  });

  it("can create a new page", () => {
    let prevHash;
    let currentHash;
    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        cy.get("#btn-add-page").click();
      })
      .then(() => {
        cy.hash().then(hash => {
          currentHash = hash;
        });
      });
    cy
      .get('[class *="PageNav__Link-"]')
      .should("have.length", 2)
      .then(() => {
        assertHash(prevHash, currentHash, {
          questionnaireId: true,
          sectionId: true,
          pageId: false
        });
      });
  });

  it("can delete a page", () => {
    cy.get('[id*="QuestionPage"]').within(() => {
      cy
        .get('[class*="IconButtonDelete"]')
        .first()
        .click();
    });
    cy.get('[class*="Dialog__StyledDialog"]').within(() => {
      cy
        .get('[class*="Button__StyledButton"]')
        .contains("Delete")
        .click();
    });
    cy.get('[class *="PageNav__Link-"]').should("have.length", 1);
  });

  it("can change the questionaire title", () => {
    cy
      .get("#title")
      .clear()
      .type("Test Questionnaire");
    cy.get("#root").click("bottomRight");
    cy.get("[aria-label='breadcrumb']").should("contain", "Test Questionnaire");
  });

  it("can create a new section", () => {
    let prevHash;
    let currentHash;
    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        cy
          .get("button")
          .contains("Add section")
          .click();
      })
      .then(() => {
        cy.hash().then(hash => {
          currentHash = hash;
        });
      })
      .then(() => {
        assertHash(prevHash, currentHash, {
          questionnaireId: true,
          sectionId: false,
          pageId: false
        });
      });
  });

  it("can delete a section", () => {
    cy.get("#questionnaire-nav").within(() => {
      cy
        .get("[aria-label='Delete section']")
        .first()
        .click();

      cy.get("[aria-label='Delete section']").should("have.length", 1);
    });
  });

  it("Can create checkboxes", () => {
    addAnswerType("Checkbox");
    cy.get('[id *="MultipleChoiceAnswer"]').within(() => {
      cy
        .get("button")
        .contains("Add another option")
        .click();
    });
    cy.get('[class *="MultipleChoiceAnswer__Options"]').within(() => {
      cy.get('[class *="Option__StyledOption"]').should("have.length", 2);
    });
    cy
      .get('[id *="Option"]')
      .first()
      .within(() => {
        cy.get("textarea#label").type("Checkbox label");
        cy.get("#description").type("Checkbox description");
      });
  });

  it("Can delete checkboxes", () => {
    cy
      .get('[id *="Option"]')
      .last()
      .within(() => {
        cy.get('[aria-label="Delete option"]').click();
      });

    cy.get('[class *="MultipleChoiceAnswer__Options"]').within(() => {
      cy.get('[class *="Option__StyledOption"]').should("have.length", 1);
    });
    cy.get("[aria-label='Delete answer']").click();
    cy.get('[id *="MultipleChoiceAnswer"]').should("not.exist");
  });

  it("Can create radio buttons", () => {
    addAnswerType("Radio");
    cy.get('[id *="MultipleChoiceAnswer"]').within(() => {
      cy
        .get("button")
        .contains("Add another option")
        .click();
    });
    cy.get('[class *="MultipleChoiceAnswer__Options"]').within(() => {
      cy.get('[class *="Option__StyledOption"]').should("have.length", 3);
    });
    cy
      .get('[id *="Option"]')
      .first()
      .within(() => {
        cy.get("textarea#label").type("Radio label");
        cy.get("#description").type("Radio description");
      });
  });

  it("Can delete radio buttons", () => {
    cy
      .get('[id *="Option"]')
      .first()
      .within(() => {
        cy.get('[aria-label="Delete option"]').click();
      });

    cy.get('[class *="MultipleChoiceAnswer__Options"]').within(() => {
      cy.get('[class *="Option__StyledOption"]').should("have.length", 2);
    });
    cy.get("[aria-label='Delete answer']").click();
    cy.get('[id *="MultipleChoiceAnswer"]').should("not.exist");
  });

  it("Can create and delete the different types of textbox", () => {
    const answerTypes = ["Text", "Textarea", "Currency", "Number"];

    answerTypes.forEach(answerType => {
      addAnswerType(answerType);
      cy.get('[id *="BasicAnswer"]');
      cy.get("#label").type(answerType + " label");
      cy.get("#description").type(answerType + " description");
      cy.get("[aria-label='Delete answer']").click();
      cy.get('[id *="BasicAnswer"]').should("not.exist");
    });
  });

  it("Can create and delete dates", () => {
    addAnswerType("Date");
    cy.get('[id *="BasicAnswer"]');
    cy.get("[aria-label='Delete answer']").click();
    cy.get('[id *="BasicAnswer"]').should("not.exist");
  });

  it("Can create and delete date ranges", () => {
    addAnswerType("Date range");
    cy.get('[id *="BasicAnswer"]');
    cy.get("[aria-label='Delete answer']").click();
    cy.get('[id *="BasicAnswer"]').should("not.exist");
  });

  it("can edit section title", () => {
    cy.get("#section-editor").within(() => {
      cy
        .get("[aria-label='title']")
        .click()
        .type("S")
        .click();
      cy.get("[aria-label='description']").click();
    });

    cy.get("#questionnaire-nav").should("contain", "S");
  });

  it("can edit page title", () => {
    cy.get("#question-page-editor").within(() => {
      cy
        .get("[aria-label='Question']")
        .click()
        .type("P")
        .click();

      cy.get("[aria-label='Question guidance']").click();
    });

    cy.get("#questionnaire-nav").should("contain", "P");
  });

  it("should create a new page when deleting only page in section", () => {
    let prevHash;
    let currentHash;
    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        cy.get('[class*="IconButtonDelete"]').click();
        cy.get('[class*="Dialog__StyledDialog"]').within(() => {
          cy
            .get('[class*="Button__StyledButton"]')
            .contains("Delete")
            .click();
        });
      })
      .then(() => {
        cy.hash().then(hash => {
          currentHash = hash;
        });
      })
      .then(() => {
        assertHash(prevHash, currentHash, {
          questionnaireId: true,
          sectionId: true,
          pageId: false
        });
      });
  });

  it("should create a new section when deleting only section", () => {
    let prevHash;
    let currentHash;
    cy
      .hash()
      .then(hash => {
        prevHash = hash;
        cy.get("#questionnaire-nav [aria-label='Delete section']").click();
      })
      .then(() => {
        cy.hash().then(hash => {
          currentHash = hash;
        });
      })
      .then(() => {
        assertHash(prevHash, currentHash, {
          questionnaireId: true,
          sectionId: false,
          pageId: false
        });
      });
  });
});

export {};