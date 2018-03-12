import React from "react";
import { shallow } from "enzyme";

import RoutingCondition, { RemoveButton, PageSelect } from "./RoutingCondition";

import sections from "./mockstate";

let wrapper, mockHandlers;

describe("components/RoutingCondition", () => {
  beforeEach(() => {
    mockHandlers = {
      onPageChange: jest.fn(),
      onRemoveClick: jest.fn()
    };

    wrapper = shallow(
      <RoutingCondition
        id="test"
        sections={sections}
        selectedPage={sections[0].pages[0]}
        {...mockHandlers}
      >
        <div>I am a child</div>
      </RoutingCondition>
    );
  });

  it("should render consistently", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onRemoveClick handler when remove button is clicked", () => {
    wrapper.find(RemoveButton).simulate("click");
    expect(mockHandlers.onRemoveClick).toHaveBeenCalled();
  });

  it("should call onUpdate with value of selected page", () => {
    const arg = { value: "hello" };
    wrapper.find(PageSelect).simulate("change", arg);
    expect(mockHandlers.onPageChange).toHaveBeenCalledWith(arg);
  });
});
