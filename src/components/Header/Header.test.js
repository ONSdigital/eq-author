import React from "react";

import { shallow } from "enzyme";

import Header, { UtilityBtns } from "components/Header";

let wrapper;

describe("components/Header", function() {
  beforeEach(() => {
    wrapper = shallow(<Header questionnaire={{ title: "Questionnaire" }} />);
  });

  it("renders correctly ", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("should conditionally render Breadcrumb", function() {
    wrapper.setProps({ questionnaire: undefined });
    expect(wrapper).toMatchSnapshot();
  });

  it("should conditionally render UtilityBtns", function() {
    wrapper.setProps({ questionnaire: undefined });
    expect(wrapper).toMatchSnapshot();
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
