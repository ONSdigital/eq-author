import React from "react";

import Button from "components/Button";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import CheckboxAnswer, { CheckboxOption, CloseButton } from "./index";

import { mount } from "enzyme";

describe("CheckboxAnswer", () => {
  let mockHandlers, wrapper;
  beforeAll(() => {
    const answer = {
      id: 0,
      options: [
        {
          id: 1,
          label: "",
          description: ""
        }
      ]
    };
    mockHandlers = {
      onAddOption: jest.fn(),
      onDeleteOption: jest.fn(),
      onAddOther: jest.fn(),
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    };
    wrapper = mount(
      <CheckboxAnswer {...mockHandlers} answer={answer} answerIndex={0} />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have one option by default", () => {
    expect(wrapper.find(CheckboxOption)).toHaveLength(1);
  });

  it("should remove option when delete is pressed", () => {
    wrapper.setProps({
      answer: {
        options: [
          {
            id: 1,
            label: "",
            description: ""
          },
          {
            id: 2,
            label: "",
            description: ""
          }
        ]
      }
    });
    wrapper.find(CloseButton).forEach(node => {
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

  it("should update label when text entered", () => {
    wrapper.find(SeamlessInput).forEach(node => {
      node.simulate("change");
    });

    expect(mockHandlers.onChange).toHaveBeenCalled();
  });

  it("should update description when text entered", () => {
    wrapper.find(SeamlessTextArea).forEach(node => {
      node.simulate("change");
    });

    expect(mockHandlers.onChange).toHaveBeenCalled();
  });
});
