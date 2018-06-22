import React from "react";
import { shallow, mount } from "enzyme";
import MultipleChoiceAnswerOptionsSelector from "./MultipleChoiceAnswerOptionsSelector";

let mockHandlers, condition;

describe("components/MultipleChoiceAnswerOptionsSelector", () => {
  beforeEach(() => {
    mockHandlers = {
      onConditionValueChange: jest.fn()
    };

    condition = {
      id: "9",
      answer: {
        options: [
          { label: "a", id: "1" },
          { label: "b", id: "2" },
          { label: "c", id: "3" }
        ]
      },
      routingValue: {
        value: "2"
      }
    };
  });

  it("should render consistently", () => {
    const wrapper = shallow(
      <MultipleChoiceAnswerOptionsSelector
        condition={condition}
        {...mockHandlers}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should set value to option id if clicking unchecked option", () => {
    const wrapper = mount(
      <MultipleChoiceAnswerOptionsSelector
        condition={condition}
        {...mockHandlers}
      />
    );

    wrapper
      .find("input")
      .at(1)
      .simulate("change");

    expect(mockHandlers.onConditionValueChange).toHaveBeenCalledWith(
      condition.id,
      null
    );
  });

  it("should set value to null if clicking checked option", () => {
    const wrapper = mount(
      <MultipleChoiceAnswerOptionsSelector
        condition={condition}
        {...mockHandlers}
      />
    );

    wrapper
      .find("input")
      .first()
      .simulate("change");

    expect(mockHandlers.onConditionValueChange).toHaveBeenCalledWith(
      condition.id,
      condition.answer.options[0].id
    );
  });

  it("should offer 'other' option if answer has one", () => {
    const other = {
      option: { label: "other", id: "4" }
    };
    condition.answer.other = other;

    const wrapper = mount(
      <MultipleChoiceAnswerOptionsSelector
        condition={condition}
        {...mockHandlers}
      />
    );

    wrapper
      .find("input")
      .findWhere(x => x.closest("label").text() === other.option.label)
      .simulate("change");

    expect(mockHandlers.onConditionValueChange).toHaveBeenCalledWith(
      condition.id,
      other.option.id
    );
  });
});
