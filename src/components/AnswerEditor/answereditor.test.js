import React from "react";
import { shallow, mount } from "enzyme";
import DeleteButton from "components/DeleteButton";
import CheckboxAnswer from "components/Answers/CheckboxAnswer";
import AnswerEditor from "components/AnswerEditor";

describe("Answer Editor", () => {
  let mockMutations;
  let mockAnswer;
  let mockCheckboxAnswer;

  const createWrapper = (props, render = shallow) => {
    return render(<AnswerEditor {...props} />);
  };

  beforeEach(() => {
    mockMutations = {
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
      createWrapper(
        {
          answer: mockAnswer,
          ...mockMutations
        },
        mount
      )
    ).toMatchSnapshot("Textfield");
  });

  it("should render Checkbox", () => {
    expect(
      createWrapper(
        {
          answer: mockCheckboxAnswer,
          ...mockMutations
        },
        mount
      )
    ).toMatchSnapshot("Checkbox");
  });

  it("should call handler when answer deleted", () => {
    const wrapper = createWrapper(
      {
        answer: mockAnswer,
        ...mockMutations
      },
      mount
    );

    wrapper.find(DeleteButton).simulate("click");
    expect(mockMutations.onDeleteAnswer).toHaveBeenCalledWith(1);
  });

  it("should add an option to answer via `id`", () => {
    const wrapper = createWrapper(
      {
        answer: mockCheckboxAnswer,
        ...mockMutations
      },
      shallow
    );
    wrapper.find(CheckboxAnswer).simulate("addOption", 1);
    expect(mockMutations.onAddOption).toHaveBeenCalledWith(1);
  });
});
