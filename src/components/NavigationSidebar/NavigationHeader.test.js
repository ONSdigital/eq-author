import React from "react";
import { shallow } from "enzyme";
import mountWithRouter from "tests/utils/mountWithRouter";
import NavigationHeader, {
  SettingsButton
} from "components/NavigationSidebar/NavigationHeader";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";

describe("NavigationHeader", () => {
  const createWrapper = (props, render = shallow) =>
    render(
      <NavigationHeader
        onUpdateQuestionnaire={jest.fn()}
        questionnaire={{}}
        {...props}
      />
    );

  it("should render", () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it("should show Modal when Settings is clicked", () => {
    const wrapper = createWrapper({}, mountWithRouter);
    wrapper.find(SettingsButton).simulate("click");

    expect(wrapper.find(QuestionnaireSettingsModal).prop("isOpen")).toBe(true);
  });

  it("should update the questionnaire when form is submitted", () => {
    const props = { onUpdateQuestionnaire: jest.fn() };
    const wrapper = createWrapper(props, mountWithRouter);

    wrapper.find(SettingsButton).simulate("click");
    wrapper.find("form").simulate("submit");

    expect(props.onUpdateQuestionnaire).toHaveBeenCalled();
  });
});
