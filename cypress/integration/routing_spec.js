import {
  setQuestionnaireSettings,
  addAnswerType,
  typeIntoDraftEditor,
  findByLabel,
  addSection,
  addQuestionPage,
  buildMultipleChoiceAnswer,
  testId,
  selectOptionByLabel
} from "../utils";

describe("Routing", () => {
  it("should see no routing rules exist and add one", () => {
    cy.visit("/");
    cy.contains("Sign in as Guest").click();
    cy.get("h1").should("contain", "Your Questionnaires");
    cy.get(testId("create-questionnaire")).click();
    setQuestionnaireSettings("Routing test questionnaire");

    typeIntoDraftEditor(testId("txt-question-title", "testid"), "question 1");

    cy.get(testId("tabs-nav")).within(() => {
      cy.contains("Routing").click();
    });

    cy.get(testId("routing-rule-set-empty-msg"));
    cy.get(testId("btn-add-rule")).click();

    cy.get(testId("routing-rule"));
  });

  it("follows the link to add a answer and routing updates with the new answer", () => {
    cy.get(testId("no-answer-msg")).within(() => {
      cy.get("a").click();
    });

    const options = ["A", "B", "C"];

    buildMultipleChoiceAnswer(options);

    cy.get(testId("tabs-nav")).within(() => {
      cy.contains("Routing").click();
    });

    cy.get(testId("routing-rule")).within(() => {
      findByLabel("IF").select("question 1");
    });

    cy.get(testId("options-selector")).within(() => {
      options.forEach((label, index) => {
        findByLabel(label).should("have.length", 1);
      });
    });
  });

  it("builds a large questionnaire.", () => {
    addQuestionPage();
    typeIntoDraftEditor(testId("txt-question-title", "testid"), "question 2");
    buildMultipleChoiceAnswer(["D", "E", "F"]);

    addSection();

    addQuestionPage();
    typeIntoDraftEditor(testId("txt-question-title", "testid"), "question 3");
    buildMultipleChoiceAnswer(["G", "H", "I"]);

    addQuestionPage();
    typeIntoDraftEditor(testId("txt-question-title", "testid"), "question 4");
    buildMultipleChoiceAnswer(["J", "K", "L"]);
  });

  it("builds a series of Or'd rules", () => {
    cy.contains("question 3").click();
    cy.get(testId("tabs-nav")).within(() => {
      cy.contains("Routing").click();
    });

    cy.get(testId("btn-add-rule")).click();

    cy.get(testId("routing-rule"));

    const setRoutingCondition = (questionTitle, label) => {
      findByLabel("IF").within(() => selectOptionByLabel(questionTitle));

      cy
        .get(testId("options-selector"))
        .within(() => cy.contains(label).click());
    };

    cy.get(testId("routing-editor")).within(() => {
      cy
        .get(testId("routing-rule"))
        .last()
        .within(() => setRoutingCondition("question 1", "A"));

      cy.get(testId("btn-add-rule")).click();
      cy.get(testId("routing-rule")).should("have.length", 2);

      cy
        .get(testId("routing-rule"))
        .last()
        .within(() => setRoutingCondition("question 2", "D"));

      cy.get(testId("btn-add-rule")).click();
      cy.get(testId("routing-rule")).should("have.length", 3);

      cy
        .get(testId("routing-rule"))
        .last()
        .within(() => setRoutingCondition("question 3", "G"));
    });

    cy
      .get(testId("options-selector"))
      .eq(0)
      .within(() => {
        cy
          .get("input")
          .first()
          .should("be.checked");
      });

    cy
      .get(testId("options-selector"))
      .eq(1)
      .within(() => {
        cy
          .get("input")
          .first()
          .should("be.checked");
      });
    cy
      .get(testId("options-selector"))
      .eq(2)
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
      .get(testId("options-selector"))
      .first()
      .contains("A");

    findByLabel("IF")
      .first()
      .select("question 2");

    cy
      .get(testId("options-selector"))
      .first()
      .contains("D");
  });

  it("can't route to a previous question", () => {
    cy
      .get(testId("result-selector"))
      .first()
      .within(() => {
        cy.contains("question 1").should("not.exist");
      });
  });

  it("deletes all current rules and builds an And'd rule set", () => {
    cy
      .get(testId("btn-delete"))
      .first()
      .click();

    cy.get(testId("routing-condition")).should("have.length", 2);

    cy
      .get(testId("btn-delete"))
      .first()
      .click();

    cy
      .get(testId("routing-rule"))
      .last()
      .within(() => {
        cy.get(testId("btn-add")).click();
        cy.get(testId("btn-add")).click();
      });

    cy.get(testId("routing-rule")).should("have.length", 1);
    cy.get(testId("routing-condition")).should("have.length", 3);
  });

  it("can change the destination to another page and the else to the Summary", () => {
    cy
      .get(testId("result-selector"))
      .first()
      .within(() => selectOptionByLabel("Page Title"));

    cy
      .get(testId("result-selector"))
      .last()
      .within(() => selectOptionByLabel("Summary"));
  });

  it("should change rule if the dependent question is removed", () => {
    const setRoutingCondition = (questionTitle, label) => {
      findByLabel("IF").within(() => selectOptionByLabel(questionTitle));

      cy
        .get(testId("options-selector"))
        .within(() => cy.contains(label).click());
    };

    cy
      .get(testId("routing-rule"))
      .last()
      .within(() => setRoutingCondition("question 1", "A"));

    cy
      .get(testId("page-item"))
      .contains("question 1")
      .click();

    cy
      .get(testId("tabs-nav"))
      .contains("Builder")
      .click();

    cy.get(testId("btn-delete")).click();
    cy.get(testId("btn-delete-modal")).click();

    cy
      .get(testId("page-item"))
      .contains("question 3")
      .click();

    cy
      .get(testId("tabs-nav"))
      .contains("Routing")
      .click();

    findByLabel("IF")
      .first()
      .contains("question 1")
      .should("not.exist");

    cy.get(testId("deleted-answer-msg")).should("exist");
  });
});
