import React from "react";
import { shallow } from "enzyme";
import StatelessQuestionnaireProperties from "components/QuestionnaireProperties";

describe("QuestionnaireProperties", () => {
  let wrapper;

  let questionnaire;
  let handleUpdate;
  let handleChange;

  beforeEach(() => {
    questionnaire = {
      id: "1",
      title: "Questionnaire title",
      description: "Questionnaire description",
      theme: "default",
      legalBasis: "Voluntary",
      navigation: false,
      summary: false,
      __typename: "Questionnaire"
    };

    handleChange = jest.fn();
    handleUpdate = jest.fn();

    wrapper = shallow(
      <StatelessQuestionnaireProperties
        questionnaire={questionnaire}
        onChange={handleChange}
        onUpdate={handleUpdate}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
