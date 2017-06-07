import React from "react";
import { shallow } from "enzyme";

import { Header, UtilityBtns, Logo } from "components/Header";
import Breadcrumb from "containers/Breadcrumb";

describe("components/Header", function() {
  it("renders correctly ", function() {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a logo", function() {
    let wrapper = shallow(<Header />);
    expect(wrapper.find(Logo).length).toBeGreaterThan(0);
  });

  it("should conditionally render Breadcrumb", function() {
    let wrapper = shallow(<Header />);
    expect(wrapper.find(Breadcrumb).length).toBeGreaterThan(0);
    wrapper = shallow(<Header hasBreadcrumbs={false} />);
    expect(wrapper.find(Breadcrumb).length).toBe(0);
  });

  it("should conditionally render UtilityBtns", function() {
    let wrapper = shallow(<Header />);
    expect(wrapper.find(UtilityBtns).length).toBeGreaterThan(0);
    wrapper = shallow(<Header hasUtilityBtns={false} />);
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
