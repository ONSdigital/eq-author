import React from "react";

import Button from "components/Button";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import CheckboxAnswer, {
  CheckboxOption,
  DeleteButton,
  SeamlessLabel
} from "./index";

import { shallow } from "enzyme";

describe("CheckboxAnswer", () => {
  let mockHandlers, wrapper, answer;
  beforeAll(() => {
    answer = {
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
    wrapper = shallow(
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
    const answer = {
      id: 1,
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
    };

    wrapper.setProps({ answer });
    const preventDefault = jest.fn();

    wrapper.find(DeleteButton).last().simulate("click", { preventDefault });

    expect(mockHandlers.onDeleteOption).toHaveBeenCalledWith(
      answer.options[1].id,
      answer.id
    );
  });

  it("should add a new option when add button is clicked", () => {
    wrapper.find(Button).first().simulate("click");

    expect(mockHandlers.onAddOption).toHaveBeenCalled();
  });

  it("should update label when text entered", () => {
    wrapper.find(SeamlessLabel).first().simulate("change");

    expect(mockHandlers.onChange).toHaveBeenCalled();
  });

  it("should update description when text entered", () => {
    wrapper.find(SeamlessTextArea).first().simulate("change");

    expect(mockHandlers.onChange).toHaveBeenCalled();
  });

  it("should invoke onBlur when option is blurred", () => {
    const stopPropagation = jest.fn();
    wrapper.find(SeamlessLabel).first().simulate("blur", { stopPropagation });

    expect(stopPropagation).toHaveBeenCalled();
    expect(mockHandlers.onBlur).toHaveBeenCalled();
  });

  it("should invoke onFocus with optionId when option is focused", () => {
    const stopPropagation = jest.fn();
    wrapper.find(SeamlessLabel).first().simulate("focus", { stopPropagation });

    expect(stopPropagation).toHaveBeenCalled();
    expect(mockHandlers.onFocus).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp(`option-${answer.options[0].id}$`))
    );
  });
});
