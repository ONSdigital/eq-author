import React from "react";
import { shallow } from "enzyme";

import RoutingRulesetEmptyMsg from "./RoutingRulesetEmptyMsg";

let wrapper, props;

describe("components/RoutingRulesetEmptyMsg", () => {
  beforeEach(() => {
    props = {
      onAddRule: jest.fn(),
      title: "Test"
    };

    wrapper = shallow(<RoutingRulesetEmptyMsg {...props} />);
  });

  it("should render children", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should allow adding a rule", () => {
    wrapper.find("[data-test='btn-add-rule']").simulate("click");
    expect(props.onAddRule).toHaveBeenCalled();
  });
});
