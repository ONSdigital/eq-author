import React from "react";
import { shallow } from "enzyme";
import QuestionnaireCreatePage from "containers/QuestionnaireCreatePage/QuestionnaireCreatePage";
import QuestionnaireMeta from "components/QuestionnaireMeta";

let wrapper, createQuestionnaire;

describe("containers/QuestionnaireCreatePage", () => {
  beforeEach(() => {
    createQuestionnaire = jest.fn();

    wrapper = shallow(
      <QuestionnaireCreatePage createQuestionnaire={createQuestionnaire} />
    );
  });

  it("should call createQuestionnaire when submitted", () => {
    const questionnaire = { title: "my questionnaire" };
    wrapper.find(QuestionnaireMeta).simulate("submit", questionnaire);

    expect(createQuestionnaire).toHaveBeenCalledWith(questionnaire);
  });
});
