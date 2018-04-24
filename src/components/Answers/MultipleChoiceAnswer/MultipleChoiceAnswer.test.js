import React from "react";

import Button from "components/Button";
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

  let mockHandlers;

  const createWrapper = ({ answer }, render = shallow) =>
    render(
      <MultipleChoiceAnswer {...mockHandlers} answer={answer} store={store} />
    );

  beforeEach(() => {
    store = createMockStore();
    mockHandlers = {
      onAddOption: jest.fn(() => Promise.resolve(option)),
      onUpdate: jest.fn(),
      onUpdateOption: jest.fn(),
      onDeleteOption: jest.fn(),
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
    wrapper
      .find(Button)
      .first()
      .simulate("click", { preventDefault });

    expect(mockHandlers.onAddOption).toHaveBeenCalledWith(answer.id);
  });

  describe("delete button", () => {
    const minOptions = 2;

    const createAnswer = numberOptions => ({
      ...answer,
      options: times(numberOptions, id => ({
        id: id,
        label: "",
        description: ""
      }))
    });

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
      wrapper
        .find(Option)
        .first()
        .simulate("enterKey", { preventDefault: jest.fn() });

      expect(mockHandlers.onAddOption).toHaveBeenCalled();
    });
  });
});
