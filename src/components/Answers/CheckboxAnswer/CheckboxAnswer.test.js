import React from "react";

import Button from "components/Button";
import CheckboxAnswer from "./";
import CheckboxOption, { DeleteButton } from "./CheckboxOption";

import { shallow } from "enzyme";

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
    render(<CheckboxAnswer {...mockHandlers} answer={answer} />);

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
    expect(mockHandlers.onAddOption).toHaveBeenCalledWith(answer.id);
  });

  it("should not show delete button when one option", () => {
    expect(wrapper.find(CheckboxOption).prop("hasDeleteButton")).toBe(false);
  });

  it("should show delete button when more than one option", () => {
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

    wrapper.setProps({ answer });
    wrapper.find(CheckboxOption).forEach(option => {
      expect(option.prop("hasDeleteButton")).toBe(true);
    });
  });

  it("should handle deleting an option", () => {
    const optionId = answer.options[0].id;
    wrapper.find(CheckboxOption).first().simulate("delete", optionId);

    expect(mockHandlers.onDeleteOption).toHaveBeenCalledWith(
      optionId,
      answer.id
    );
  });
});
