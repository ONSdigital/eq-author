import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import { Header, UtilityBtns, Logo } from "components/Header";
import Breadcrumb from "containers/Breadcrumb";

let wrapper;

describe("components/Header", function() {
  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it("renders correctly ", function() {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render a logo", function() {
    expect(wrapper.find(Logo).length).toBeGreaterThan(0);
  });

  it("should conditionally render Breadcrumb", function() {
    expect(wrapper.find(Breadcrumb).length).toBeGreaterThan(0);
    wrapper.setProps({ hasBreadcrumbs: false });
    expect(wrapper.find(Breadcrumb).length).toBe(0);
  });

  it("should conditionally render UtilityBtns", function() {
    expect(wrapper.find(UtilityBtns).length).toBeGreaterThan(0);
    wrapper.setProps({ hasUtilityBtns: false });
    expect(wrapper.find(UtilityBtns).length).toBe(0);
  });
});

describe("components/Header/UtilityBtns", function() {
  it("will render children", function() {
    const children = "I am some children";
    const wrapper = shallow(<UtilityBtns>{children}</UtilityBtns>);
    expect(wrapper.contains(children)).toBe(true);
  });
});
