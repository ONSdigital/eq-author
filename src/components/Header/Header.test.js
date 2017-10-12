import React from "react";

import { shallow } from "enzyme";

import Header, { UtilityBtns } from "components/Header";

let wrapper;

describe("components/Header", function() {
  let env;
  let now;

  beforeEach(() => {
    env = process.env;
    process.env = {
      REACT_APP_PUBLISHER_URL: "http://eq-publisher/publish",
      REACT_APP_GO_LAUNCH_A_SURVEY_URL: "http://go-launch-a-survey/quick-launch"
    };

    now = Date.now;
    Date.now = () => 1507793425522;

    wrapper = shallow(<Header questionnaire={{ title: "Questionnaire" }} />);
  });

  afterEach(() => {
    process.env = env;
    Date.now = now;
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
    const wrapper = shallow(<UtilityBtns>{children}</UtilityBtns>);
    expect(wrapper.contains(children)).toBe(true);
  });
});
