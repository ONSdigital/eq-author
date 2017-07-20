import React from "react";
import { shallow } from "enzyme";

import IconGridButton from "./IconGridButton";

const mockFn = jest.fn();
let wrapper;

describe("components/IconGrid", function() {
  beforeEach(() => {
    wrapper = shallow(
      <IconGridButton icon="checkbox" title="Checkbox" onClick={mockFn} />
    );
  });

  it("will onClick", function() {
    wrapper.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("will blow up when an non-existant icon is used", function() {
    expect(() => {
      wrapper.setProps({ icon: "not-an-icon" });
    }).toThrow();
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
