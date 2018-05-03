import React from "react";
import { shallow } from "enzyme";
import NavLink from "./NavLink";

describe("NavLink", () => {
  let wrapper;

  const props = {
    isActive: jest.fn(),
    to: "/page-1",
    title: "Page 1",
    icon: () => <svg />
  };

  beforeEach(() => {
    wrapper = shallow(<NavLink {...props}>Page 1</NavLink>);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
