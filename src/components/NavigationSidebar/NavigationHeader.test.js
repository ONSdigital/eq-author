import React from "react";
import { shallow } from "enzyme";
import NavigationHeader from "components/NavigationSidebar/NavigationHeader";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";

describe("NavigationHeader", () => {
  const createWrapper = props =>
    shallow(
      <NavigationHeader
        questionnaire={{}}
        onUpdateQuestionnaire={jest.fn()}
        {...props}
      />
    );

  it("should render", () => {
    expect(createWrapper()).toMatchSnapshot();
  });

  it("allows modal to be open and closed", () => {
    const wrapper = createWrapper();

    wrapper.find(`[data-test="settings-btn"]`).simulate("click");
    expect(wrapper.find(QuestionnaireSettingsModal).prop("isOpen")).toBe(true);

    wrapper.find(QuestionnaireSettingsModal).simulate("close");
    expect(wrapper.find(QuestionnaireSettingsModal).prop("isOpen")).toBe(false);
  });

  it("updates questionnaire after submission", () => {
    const onUpdateQuestionnaire = jest.fn();
    const wrapper = createWrapper({ onUpdateQuestionnaire });

    wrapper.find(QuestionnaireSettingsModal).simulate("submit");

    expect(onUpdateQuestionnaire).toHaveBeenCalled();
  });
});
