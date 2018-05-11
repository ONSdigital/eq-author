import React from "react";
import MultipleChoiceAnswer from "./";
import Option from "./Option";
import { times } from "lodash";

import { shallow } from "enzyme";
import createMockStore from "tests/utils/createMockStore";

describe("MultipleChoiceAnswer", () => {
  let wrapper;

  let answer = {
    id: "0",
    options: [
      {
        id: "1",
        label: "",
        description: "",
        __typename: "Option"
      }
    ]
  };

  let store;

  const option = {
    id: "123",
    __typename: "Option"
  };

  const optionWithAnswer = {
    answer: {
      ...answer,
      id: "1",
      type: "TextField"
    },
    option: {
      ...option,
      id: "2"
    }
  };

  let mockHandlers;

  const createAnswer = numberOptions => ({
    ...answer,
    options: times(numberOptions, id => ({
      id: id,
      label: "",
      description: ""
    }))
  });

  const createWrapper = ({ answer, minOptions }, render = shallow) =>
    render(
      <MultipleChoiceAnswer
        {...mockHandlers}
        answer={answer}
        minOptions={minOptions}
        store={store}
      />
    );

  beforeEach(() => {
    store = createMockStore();
    mockHandlers = {
      onAddOption: jest.fn(() => Promise.resolve(option)),
      onUpdate: jest.fn(),
      onUpdateOption: jest.fn(),
      onDeleteOption: jest.fn(),
      onAddOther: jest.fn(() => Promise.resolve(optionWithAnswer)),
      onDeleteOther: jest.fn(() => Promise.resolve(optionWithAnswer)),
      onChange: jest.fn()
    };

    wrapper = createWrapper({ answer });
  });

  it("should have one option by default", () => {
    expect(wrapper.find(Option)).toHaveLength(1);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should add a new option when add button is clicked", () => {
    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();
    wrapper
      .find("[dataTest='btn-add-option']")
      .simulate("primaryAction", { preventDefault, stopPropagation });

    expect(preventDefault).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
    expect(mockHandlers.onAddOption).toHaveBeenCalledWith(answer.id);
  });

  describe("delete button", () => {
    const minOptions = 2;

    beforeEach(() => {
      wrapper.setProps({ minOptions });
    });

    it("should not show when number options <= minOptions", () => {
      const answer = createAnswer(minOptions);
      wrapper.setProps({ answer });

      wrapper.find(Option).forEach(option => {
        expect(option.prop("hasDeleteButton")).toBe(false);
      });
    });

    it("should show when number options > minOptions", () => {
      const answer = createAnswer(minOptions + 1);
      wrapper.setProps({ answer });

      wrapper.find(Option).forEach(option => {
        expect(option.prop("hasDeleteButton")).toBe(true);
      });
    });

    it("should handle deleting an option", () => {
      const optionId = answer.options[0].id;
      wrapper
        .find(Option)
        .first()
        .simulate("delete", optionId);

      expect(mockHandlers.onDeleteOption).toHaveBeenCalledWith(
        optionId,
        answer.id
      );
    });

    it("should add a new option onEnterKey", () => {
      const preventDefault = jest.fn();
      const stopPropagation = jest.fn();

      wrapper
        .find(Option)
        .first()
        .simulate("enterKey", { preventDefault, stopPropagation });

      expect(preventDefault).toHaveBeenCalled();
      expect(stopPropagation).toHaveBeenCalled();
      expect(mockHandlers.onAddOption).toHaveBeenCalledTimes(1);
    });
  });

  describe("other option and answer", () => {
    const minOptions = 2;

    let answerWithOther;
    let preventDefault;

    beforeEach(() => {
      answerWithOther = {
        ...createAnswer(minOptions),
        other: optionWithAnswer
      };

      preventDefault = jest.fn();

      wrapper = createWrapper({ answer: answerWithOther });
    });

    it("should render other", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should add call create other on click of split button menu item", () => {
      wrapper
        .find("[data-test='btn-add-option-other']")
        .first()
        .simulate("click", { preventDefault });
      expect(mockHandlers.onAddOther).toHaveBeenCalledWith(answerWithOther);
    });

    it('should call onDeleteOther when deleting the "other" option', () => {
      wrapper
        .find(Option)
        .last()
        .simulate("delete", { preventDefault });
      expect(mockHandlers.onDeleteOther).toHaveBeenCalledWith(answerWithOther);
    });

    it("should show delete button when number options + other > minOptions", () => {
      const moreThanTwoOptions = {
        ...createAnswer(2),
        other: optionWithAnswer
      };
      wrapper = createWrapper({ answer: moreThanTwoOptions, minOptions });
      wrapper.find(Option).forEach(option => {
        expect(option.prop("hasDeleteButton")).toBe(true);
      });
    });

    it("should not show delete button when number options + other <= minOptions", () => {
      const twoOptionsExactly = {
        ...createAnswer(1),
        other: optionWithAnswer
      };
      wrapper = createWrapper({ answer: twoOptionsExactly, minOptions });
      wrapper.find(Option).forEach(option => {
        expect(option.prop("hasDeleteButton")).toBe(false);
      });
    });
  });
});
