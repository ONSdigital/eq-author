import React from "react";
import { shallow } from "enzyme";
import QuestionnaireMetaPage from "./QuestionnaireMeta";

let wrapper;

const handleUpdate = jest.fn();

const questionnaire = {
  title: "My Questionnaire",
  description: "",
  legalBasis: "",
  navigation: true,
  theme: "default"
};

describe("containers/QuestionnaireMeta", () => {
  beforeEach(() => {
    wrapper = shallow(
      <QuestionnaireMetaPage
        update={handleUpdate}
        loading={false}
        questionnaire={questionnaire}
      />
    );
  });

  it("should update state with questionnaire data when received as props", () => {
    wrapper.setProps({ questionnaire });
    expect(wrapper.state().questionnaire).toMatchObject(questionnaire);
  });
});
