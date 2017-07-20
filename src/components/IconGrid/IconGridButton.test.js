import React from "react";
import { shallow } from "enzyme";

import IconGridButton, { icons } from "./IconGridButton";

const mockFn = jest.fn();
let wrapper;

describe("components/IconGrid", function() {
  beforeEach(() => {
    wrapper = shallow(
      <IconGridButton icon="checkbox" title="Checkbox" handleClick={mockFn} />
    );
  });

  it("will render an icon", function() {
    expect(wrapper.find("img").props().src).toContain(icons.checkbox);
  });

  it("will render a title", function() {
    expect(wrapper.props().title).toEqual("Checkbox");
  });

  it("will handleClick", function() {
    wrapper.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("will blow up when an non-existant icon is used", function() {
    expect(() => {
      wrapper.setProps({ icon: "not-an-icon" });
    }).toThrow();
  });
});
