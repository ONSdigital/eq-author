import React from "react";

import Button from "components/Button";
import CheckboxAnswer from "./";
import CheckboxOption, { DeleteButton } from "./CheckboxOption";

import { mount, shallow } from "enzyme";

describe("CheckboxAnswer", () => {
  let wrapper;

  let answer = {
    id: 0,
    options: [
      {
        id: 1,
        label: "",
        description: ""
      }
    ]
  };

  let mockHandlers = {
    onAddOption: jest.fn(),
    onUpdateOption: jest.fn(),
    onDeleteOption: jest.fn(),
    onChange: jest.fn(),
    onEntered: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn()
  };

  const createWrapper = ({ answer }, render = shallow) =>
    render(
      <CheckboxAnswer {...mockHandlers} answer={answer} answerIndex={0} />
    );

  beforeEach(() => {
    wrapper = createWrapper({
      answer
    });
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

  it("should only have delete button when options > 1", () => {
    expect(wrapper.find(DeleteButton).length).toBe(0);
  });

  it("should handle deleting an option", () => {
    const answer = {
      id: 0,
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
    const { id } = answer.options[0];
    wrapper = createWrapper({ answer }, mount);
    wrapper.find(DeleteButton).first().simulate("click");
    expect(mockHandlers.onDeleteOption).toHaveBeenCalledWith(id, answer.id);
  });
});
