import React from "react";
import { UnwrappedQuestionnairesPage } from "./QuestionnairesPage";
import { shallow } from "enzyme";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";

describe("containers/QuestionnairesPage", () => {
  const createWrapper = props =>
    shallow(
      <UnwrappedQuestionnairesPage
        isModalOpen={false}
        onModalClose={jest.fn()}
        onModalOpen={jest.fn()}
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

  it("should invoke onModalOpen prop when delete button is clicked", () => {
    const onModalOpen = jest.fn();
    const wrapper = createWrapper({ onModalOpen });

    wrapper.find("#btn-create-questionnaire").simulate("click");

    expect(onModalOpen).toHaveBeenCalled();
  });

  it("should invoke onModalClose when modal closed", () => {
    const onModalClose = jest.fn();
    const wrapper = createWrapper({ onModalClose });

    wrapper.find(QuestionnaireSettingsModal).simulate("close");

    expect(onModalClose).toHaveBeenCalled();
  });

  it("should created questionnaire after submission", () => {
    const onCreateQuestionnaire = jest.fn();
    const wrapper = createWrapper({ onCreateQuestionnaire });

    wrapper.find(QuestionnaireSettingsModal).simulate("submit");

    expect(onCreateQuestionnaire).toHaveBeenCalled();
  });
});
