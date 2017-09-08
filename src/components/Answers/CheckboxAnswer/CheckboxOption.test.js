import React from "react";

import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import {
  StatelessCheckboxOption,
  DeleteButton,
  SeamlessLabel
} from "./CheckboxOption";

import { shallow } from "enzyme";

describe("CheckboxOption", () => {
  let mockMutations;
  let mockEvent;
  let wrapper;

  const option = {
    id: 1,
    label: "",
    description: ""
  };

  beforeEach(() => {
    mockEvent = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    };

    mockMutations = {
      onChange: jest.fn(),
      onUpdate: jest.fn(),
      onFocus: jest.fn(),
      onDelete: jest.fn()
    };

    wrapper = shallow(
      <StatelessCheckboxOption
        {...mockMutations}
        option={option}
        hasDeleteButton
      />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onChange on input", () => {
    wrapper.find(SeamlessLabel).first().simulate("change");
    wrapper.find(SeamlessLabel).first().simulate("change");

    expect(mockMutations.onChange).toHaveBeenCalledTimes(2);
  });

  it("should update label on blur", () => {
    wrapper.find(SeamlessLabel).first().simulate("blur", mockEvent);

    expect(mockMutations.onUpdate).toHaveBeenCalled();
  });

  it("should update description on blur", () => {
    wrapper.find(SeamlessTextArea).first().simulate("blur", mockEvent);

    expect(mockMutations.onUpdate).toHaveBeenCalled();
  });

  it("should invoke onDelete callback when option deleted", () => {
    wrapper.find(DeleteButton).first().simulate("click", mockEvent);

    expect(mockMutations.onDelete).toHaveBeenCalledWith(option.id);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it("should invoke stop propagation of focus event", () => {
    wrapper.find(SeamlessLabel).first().simulate("focus", mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });
});
