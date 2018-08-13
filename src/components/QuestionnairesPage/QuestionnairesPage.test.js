import React from "react";
import { UnconnectedQuestionnairesPage } from "./index";
import { shallow } from "enzyme";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";

describe("components/QuestionnairesPage", () => {
  const createWrapper = props =>
    shallow(
      <UnconnectedQuestionnairesPage
        onDeleteQuestionnaire={jest.fn()}
        onCreateQuestionnaire={jest.fn()}
        {...props}
      />
    );

  it("should not render table whilst data is loading", () => {
    const wrapper = createWrapper({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when there are no questionnaires", () => {
    const wrapper = createWrapper({ questionnaires: [] });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render table when there are questionnaires", () => {
    const questionnaires = [
      {
        id: "1",
        title: "Test questionnaire",
        createdAt: "01/01/1970",
        createdBy: { name: "Mike" },
        sections: [
          {
            id: "5",
            pages: [{ id: "10" }]
          }
        ]
      }
    ];
    const wrapper = createWrapper({ questionnaires });

    expect(wrapper).toMatchSnapshot();
  });

  it("allows modal to be open and closed", () => {
    const wrapper = createWrapper();

    wrapper.find("[data-test='create-questionnaire']").simulate("click");
    expect(wrapper.find(QuestionnaireSettingsModal).prop("isOpen")).toBe(true);

    wrapper.find(QuestionnaireSettingsModal).simulate("close");
    expect(wrapper.find(QuestionnaireSettingsModal).prop("isOpen")).toBe(false);
  });

  it("creates questionnaire after submission", () => {
    const onCreateQuestionnaire = jest.fn();
    const wrapper = createWrapper({ onCreateQuestionnaire });

    wrapper.find(QuestionnaireSettingsModal).simulate("submit");

    expect(onCreateQuestionnaire).toHaveBeenCalled();
  });
});
