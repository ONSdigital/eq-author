import React from "react";

import Button from "components/Button";
import CheckboxAnswer from "./";
import CheckboxOption from "./CheckboxOption";

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
      onChange: jest.fn(),
      onEntered: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    };

    wrapper = shallow(
      <CheckboxAnswer {...mockHandlers} answer={answer} answerIndex={0} />
    );
  });

  it("should have one option by default", () => {
    expect(wrapper.find(CheckboxOption)).toHaveLength(1);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should add a new option when add button is clicked", () => {
    const preventDefault = jest.fn();
    wrapper.find(Button).first().simulate("click", { preventDefault });

    expect(mockHandlers.onAddOption).toHaveBeenCalled();
  });
});
