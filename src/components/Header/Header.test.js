import React from "react";

import { shallow } from "enzyme";

import Header, { UtilityBtns, Logo } from "components/Header";
import Breadcrumb from "components/Breadcrumb";

let wrapper;

describe("components/Header", function() {
  beforeEach(() => {
    wrapper = shallow(<Header questionnaire={{ title: "Questionnaire" }} />);
  });

  it("renders correctly ", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a logo", function() {
    expect(wrapper.find(Logo).length).toBeGreaterThan(0);
  });

  it("should conditionally render Breadcrumb", function() {
    expect(wrapper.find(Breadcrumb).length).toBeGreaterThan(0);
    wrapper.setProps({ questionnaire: undefined });
    expect(wrapper.find(Breadcrumb).length).toBe(0);
  });

  it("should conditionally render UtilityBtns", function() {
    expect(wrapper.find(UtilityBtns).length).toBeGreaterThan(0);
    wrapper.setProps({ questionnaire: undefined });
    expect(wrapper.find(UtilityBtns).length).toBe(0);
  });
});

describe("components/Header/UtilityBtns", function() {
  it("will render children", function() {
    const children = "I am some children";
    const wrapper = shallow(
      <UtilityBtns>
        {children}
      </UtilityBtns>
    );
    expect(wrapper.contains(children)).toBe(true);
  });
});
