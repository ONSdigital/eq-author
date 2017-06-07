import React from "react";
import { mount } from "enzyme";
import { StyledNav } from "components/Nav";

describe("components/Nav", function() {
  it("should contain links", function() {
    const wrapper = mount(<StyledNav />);
    expect(wrapper.find("a")).toBeTruthy();
  });
});
