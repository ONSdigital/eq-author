import React from "react";

import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import CheckboxOption, { SeamlessLabel } from "./CheckboxOption";

import { shallow, mount } from "enzyme";

describe("CheckboxOption", () => {
  let mockMutations;
  let mockEvent;
  let wrapper;
  let mounted;

  const option = {
    id: 1,
    label: "",
    description: ""
  };

  beforeEach(() => {
    mockEvent = {
      stopPropagation: jest.fn()
    };

    mockMutations = {
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onDelete: jest.fn()
    };

    wrapper = shallow(
      <CheckboxOption {...mockMutations} option={option} hasDeleteButton />
    );

    mounted = mount(
      <CheckboxOption {...mockMutations} option={option} hasDeleteButton />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should update label on blur", () => {
    wrapper.find(SeamlessLabel).first().simulate("blur", mockEvent);

    expect(mockMutations.onChange).toHaveBeenCalled();
  });

  it("should update description on blur", () => {
    wrapper.find(SeamlessTextArea).first().simulate("blur", mockEvent);

    expect(mockMutations.onChange).toHaveBeenCalled();
  });

  it("should stop propagation of blur event", () => {
    wrapper.find(SeamlessLabel).first().simulate("blur", mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it("should invoke onDelete callback when option deleted", () => {
    mounted.find("button").first().simulate("click");

    expect(mockMutations.onDelete).toHaveBeenCalledWith(1);
  });

  it("should invoke stop propagation of focus event", () => {
    wrapper.find(SeamlessLabel).first().simulate("focus", mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });
});
