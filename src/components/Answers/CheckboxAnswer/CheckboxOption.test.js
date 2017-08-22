import React from "react";

import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import CheckboxOption, { SeamlessLabel } from "./CheckboxOption";

import { shallow } from "enzyme";

describe("CheckboxOption", () => {
  let mockHandlers, wrapper, option;
  beforeAll(() => {
    const answer = {
      id: 0
    };

    option = {
      id: 1,
      label: "",
      description: ""
    };

    mockHandlers = {
      onAddOption: jest.fn(),
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      onEntered: jest.fn(),
      onDelete: jest.fn()
    };

    wrapper = shallow(
      <CheckboxOption
        {...mockHandlers}
        hasDeleteButton
        answerId={answer.id}
        answerIndex={0}
        option={option}
        optionIndex={1}
        optionName={`answer-${answer.id}-option-${option.id}`}
      />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
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
    // expect(mockHandlers.onFocus).toHaveBeenCalledWith(
    //   expect.stringMatching(new RegExp(`option-${answer.options[0].id}$`))
    // );
  });
});
