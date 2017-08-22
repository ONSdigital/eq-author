import React from "react";

import Button from "components/Button";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import CheckboxAnswer, {
  CheckboxOption,
  DeleteButton,
  AddOtherLink
} from "./index";

import { mount } from "enzyme";

describe("CheckboxAnswer", () => {
  let mockHandlers, wrapper;
  beforeAll(() => {
    mockHandlers = {
      onAddOption: jest.fn(),
      onDeleteOption: jest.fn(),
      onAddOther: jest.fn(),
      onChangeLabel: jest.fn(),
      onChangeDescription: jest.fn()
    };
    wrapper = mount(<CheckboxAnswer {...mockHandlers} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have one option by default", () => {
    expect(wrapper.find(CheckboxOption)).toHaveLength(1);
  });

  it("should remove option when delete is pressed", () => {
    wrapper.find(DeleteButton).forEach(node => {
      node.simulate("click");
    });

    expect(mockHandlers.onDeleteOption).toHaveBeenCalled();
  });

  it("should add a new option when add button is clicked", () => {
    wrapper.find(Button).forEach(node => {
      node.simulate("click");
    });

    expect(mockHandlers.onAddOption).toHaveBeenCalled();
  });

  it("should add other answer when other link is clicked", () => {
    wrapper.find(AddOtherLink).forEach(node => {
      node.simulate("click");
    });

    expect(mockHandlers.onAddOther).toHaveBeenCalled();
  });

  it("should update label when text entered", () => {
    wrapper.find(SeamlessInput).forEach(node => {
      node.simulate("change");
    });

    expect(mockHandlers.onChangeLabel).toHaveBeenCalled();
  });

  it("should update description when text entered", () => {
    wrapper.find(SeamlessTextArea).forEach(node => {
      node.simulate("change");
    });

    expect(mockHandlers.onChangeDescription).toHaveBeenCalled();
  });
});
