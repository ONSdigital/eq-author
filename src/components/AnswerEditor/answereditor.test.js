import React from "react";
import { shallow } from "enzyme";
import { merge } from "lodash";
import MultipleChoiceAnswer from "components/Answers/MultipleChoiceAnswer";
import AnswerEditor, { AnswerDeleteButton } from "components/AnswerEditor";
import {
  TEXTFIELD,
  NUMBER,
  CURRENCY,
  CHECKBOX,
  RADIO,
  TIME
} from "constants/answer-types";

describe("Answer Editor", () => {
  let mockMutations;
  let mockAnswer;
  let mockMultipleChoiceAnswer;

  const createWrapper = (props, render = shallow) => {
    return render(<AnswerEditor {...props} />);
  };

  beforeEach(() => {
    mockMutations = {
      onDeleteAnswer: jest.fn(),
      onChange: jest.fn(),
      onUpdate: jest.fn(),
      onAddOption: jest.fn(),
      onUpdateOption: jest.fn(),
      onDeleteOption: jest.fn()
    };

    mockAnswer = {
      id: 1,
      title: "",
      description: "",
      type: TEXTFIELD
    };

    mockMultipleChoiceAnswer = {
      ...mockAnswer,
      type: CHECKBOX,
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
    const wrapper = createWrapper({
      answer: mockAnswer,
      ...mockMutations
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Number", () => {
    const wrapper = createWrapper({
      answer: merge({}, mockAnswer, { type: NUMBER }),
      ...mockMutations
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Currency", () => {
    const wrapper = createWrapper({
      answer: merge({}, mockAnswer, { type: CURRENCY }),
      ...mockMutations
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Checkbox", () => {
    const wrapper = createWrapper({
      answer: mockMultipleChoiceAnswer,
      ...mockMutations
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Radio", () => {
    const wrapper = createWrapper({
      answer: {
        ...mockMultipleChoiceAnswer,
        type: RADIO
      },
      ...mockMutations
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should throw for unknown answer types", () => {
    const unknownAnswer = {
      ...mockAnswer,
      type: TIME
    };

    expect(() => {
      createWrapper({
        answer: unknownAnswer,
        ...mockMutations
      });
    }).toThrow(TypeError);
  });

  it("should call handler when answer deleted", () => {
    const wrapper = createWrapper({
      answer: mockAnswer,
      ...mockMutations
    });

    wrapper.find(AnswerDeleteButton).first().simulate("click");
    expect(mockMutations.onDeleteAnswer).toHaveBeenCalledWith(mockAnswer.id);
  });

  it("should add an option to answer via `id`", () => {
    const wrapper = createWrapper({
      answer: mockMultipleChoiceAnswer,
      ...mockMutations
    });
    wrapper.find(MultipleChoiceAnswer).simulate("addOption");
    expect(mockMutations.onAddOption).toHaveBeenCalled();
  });
});
