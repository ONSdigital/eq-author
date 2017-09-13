import React from "react";
import { shallow } from "enzyme";
import QuestionnaireMetaPage from "./QuestionnaireMetaPage";

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
        onUpdate={handleUpdate}
        loading={false}
        questionnaire={questionnaire}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render nothing while loading", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });
});
