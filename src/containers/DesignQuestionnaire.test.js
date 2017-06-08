import { updateItem } from "actions/questionnaire/items";
import { getType, mapDispatchToProps } from "./DesignQuestionnaire";

const routeParams = {
  answersId: "my-answer",
  questionsId: "my-question",
  sectionsId: "my-section"
};

const questionnaireState = {
  sections: {
    "my-section": {}
  },
  questions: {
    "my-question": {}
  },
  answers: {
    "my-answer": {}
  }
};

describe("containers/DesignQuestionnaire", function() {
  it("should return a section when the route param sectionsId matches a section id in state", function() {
    expect(
      getType(
        {
          sectionsId: routeParams.sectionsId
        },
        questionnaireState
      )
    ).toEqual({ id: "my-section", item: {}, type: "sections" });
  });

  it("should return a question when the route param questionsId matches a question id in state", function() {
    expect(
      getType(
        {
          questionsId: routeParams.questionsId,
          sectionsId: routeParams.sectionsId
        },
        questionnaireState
      )
    ).toEqual({ id: "my-question", item: {}, type: "questions" });
  });

  it("should return an answer when the route param answersId matches a answer id in state", function() {
    expect(
      getType(
        {
          answersId: routeParams.answersId,
          questionsId: routeParams.questionsId,
          sectionsId: routeParams.sectionsId
        },
        questionnaireState
      )
    ).toEqual({ id: "my-answer", item: {}, type: "answers" });
  });

  it("should augment the value of events bubbled from Input components", function() {
    const value = mapDispatchToProps.onChange({
      target: {
        name: "answers.options.mandatory",
        type: "checkbox",
        checked: true
      }
    });
    const action = updateItem("answers.options.mandatory", true);
    expect(value).toEqual(action);
  });
});
