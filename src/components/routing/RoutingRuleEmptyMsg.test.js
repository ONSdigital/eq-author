import React from "react";
import { shallow } from "enzyme";

import RoutingRuleEmptyMsg from "./RoutingRuleEmptyMsg";

let wrapper, props;

describe("components/RoutingRuleEmptyMsg", () => {
  beforeEach(() => {
    props = {
      onAddRule: jest.fn(),
      title: "Test"
    };

    wrapper = shallow(<RoutingRuleEmptyMsg {...props} />);
  });

  it("should render children", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should allow adding a rule", () => {
    wrapper.find("[data-test='btn-add-rule']").simulate("click");
    expect(props.onAddRule).toHaveBeenCalled();
  });
});
