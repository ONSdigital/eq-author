import React from "react";
import { render } from "enzyme";
import Nav from "components/Nav";

describe("navigation", () => {
  it("renders three `.Nav__StyledNavLink-cvnbpY`s", () => {
    const wrapper = render(<Nav />);
    expect(wrapper.find(".Nav__StyledNavLink-cvnbpY").length).to.equal(3);
  });
});
