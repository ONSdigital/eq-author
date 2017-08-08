import React from "react";

import Button from "../../Button";
import SeamlessInput from "../../QuestionnaireDesign/SeamlessInput";
import SeamlessTextArea from "../../QuestionnaireDesign/SeamlessTextArea";
import CheckboxAnswer, {
  CheckboxOption,
  CloseButton,
  AddOtherLink
} from "./index";

import { shallow, mount } from "enzyme";

describe("CheckboxAnswer", () => {
  let mockHandlers;
  beforeEach(() => {
    mockHandlers = {
      onAddOption: jest.fn(),
      onDeleteOption: jest.fn(),
      onAddOther: jest.fn(),
      onChangeLabel: jest.fn(),
      onChangeDescription: jest.fn()
    };
  });

  it("should match snapshot", () => {
    const wrapper = shallow(<CheckboxAnswer {...mockHandlers} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should have one option by default", () => {
    const wrapper = mount(<CheckboxAnswer {...mockHandlers} />);
    expect(wrapper.find(CheckboxOption)).toHaveLength(1);
  });

  it("should remove option when delete is pressed", () => {
    const wrapper = mount(<CheckboxAnswer {...mockHandlers} />);
    wrapper.find(CloseButton).forEach(node => {
      node.simulate("click");
    });

    expect(mockHandlers.onDeleteOption).toHaveBeenCalled();
  });

  it("should add a new option when add button is clicked", () => {
    const wrapper = mount(<CheckboxAnswer {...mockHandlers} />);
    wrapper.find(Button).forEach(node => {
      node.simulate("click");
    });

    expect(mockHandlers.onAddOption).toHaveBeenCalled();
  });

  it("should add other answer when other link is clicked", () => {
    const wrapper = mount(<CheckboxAnswer {...mockHandlers} />);
    wrapper.find(AddOtherLink).forEach(node => {
      node.simulate("click");
    });

    expect(mockHandlers.onAddOther).toHaveBeenCalled();
  });

  it("should update label when text entered", () => {
    const wrapper = mount(<CheckboxAnswer {...mockHandlers} />);
    wrapper.find(SeamlessInput).forEach(node => {
      node.simulate("change");
    });

    expect(mockHandlers.onChangeLabel).toHaveBeenCalled();
  });

  it("should update description when text entered", () => {
    const wrapper = mount(<CheckboxAnswer {...mockHandlers} />);
    wrapper.find(SeamlessTextArea).forEach(node => {
      node.simulate("change");
    });

    expect(mockHandlers.onChangeDescription).toHaveBeenCalled();
  });
});
