import React from "react";
import { shallow } from "enzyme";

import RoutingRuleSetEmptyMsg from "./RoutingRuleSetEmptyMsg";

let wrapper, props;

describe("components/RoutingRuleSetEmptyMsg", () => {
  beforeEach(() => {
    props = {
      onAddRule: jest.fn(),
      title: "Test"
    };

    wrapper = shallow(<RoutingRuleSetEmptyMsg {...props} />);
  });

  it("should render children", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should allow adding a rule", () => {
    wrapper.find("[data-test='btn-add-rule']").simulate("click");
    expect(props.onAddRule).toHaveBeenCalled();
  });
});
