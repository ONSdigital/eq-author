import React from "react";
import { mount } from "enzyme";
import AnswerEditor from "./index";

describe("Answer Editor", () => {
  let mockProps;
  let mockAnswer;
  let mockCheckboxAnswer;

  beforeEach(() => {
    mockProps = {
      onChange: jest.fn(),
      onDeleteAnswer: jest.fn(),
      onAddOption: jest.fn(),
      onUpdateOption: jest.fn(),
      onDeleteOption: jest.fn(),
      onBlur: jest.fn(),
      onEntered: jest.fn(),
      onFocus: jest.fn()
    };

    mockAnswer = {
      id: 1,
      title: "",
      description: "",
      type: "TextField"
    };

    mockCheckboxAnswer = {
      ...mockAnswer,
      type: "Checkbox",
      options: [
        {
          id: 1,
          label: "",
          description: ""
        }
      ]
    };
  });

  it("should render TextField", () => {
    expect(
      mount(<AnswerEditor answer={mockAnswer} {...mockProps} />)
    ).toMatchSnapshot("Textfield");
  });

  it("should render Checkbox", () => {
    expect(
      mount(<AnswerEditor answer={mockCheckboxAnswer} {...mockProps} />)
    ).toMatchSnapshot("Checkbox");
  });
});
