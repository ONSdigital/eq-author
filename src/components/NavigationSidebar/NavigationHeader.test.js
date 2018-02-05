import React from "react";
import { shallow } from "enzyme";
import { UnwrappedNavigationHeader } from "components/NavigationSidebar/NavigationHeader";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";

describe("NavigationHeader", () => {
  const createWrapper = (props = {}) =>
    shallow(
      <UnwrappedNavigationHeader
        isModalOpen={false}
        onModalOpen={jest.fn()}
        onModalClose={jest.fn()}
        onUpdateQuestionnaire={jest.fn()}
        questionnaire={{}}
        {...props}
      />
    );

  it("should render", () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it("shows Modal when Settings is clicked", () => {
    const onModalOpen = jest.fn();
    const wrapper = createWrapper({ onModalOpen });

    wrapper.find(`[data-test="settings-btn"]`).simulate("click");

    expect(onModalOpen).toHaveBeenCalled();
  });

  it("allows modal to be closed", () => {
    const onModalClose = jest.fn();
    const wrapper = createWrapper({ onModalClose });

    wrapper.find(QuestionnaireSettingsModal).simulate("close");

    expect(onModalClose).toHaveBeenCalled();
  });

  it("should update the questionnaire when form is submitted", () => {
    const onUpdateQuestionnaire = jest.fn();
    const wrapper = createWrapper({ onUpdateQuestionnaire });

    wrapper.find(QuestionnaireSettingsModal).simulate("submit");

    expect(onUpdateQuestionnaire).toHaveBeenCalled();
  });
});
