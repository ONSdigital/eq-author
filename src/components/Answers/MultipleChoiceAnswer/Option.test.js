import React from "react";

import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import { StatelessOption, DeleteButton, SeamlessLabel } from "./Option";

import { shallow } from "enzyme";

describe("Option", () => {
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
      <StatelessOption {...mockMutations} option={option} hasDeleteButton />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("shouldn't render delete button if not applicable", () => {
    wrapper.setProps({ hasDeleteButton: false });
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
    wrapper.find(DeleteButton).simulate("click", mockEvent);

    expect(mockMutations.onDelete).toHaveBeenCalledWith(option.id);
  });
});
