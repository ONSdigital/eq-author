import React from "react";
import { shallow } from "enzyme";

import RoutingRuleSet from "./RoutingRuleSet";

import routingOptions from "./mockstate";

let wrapper, props;

describe("components/RoutingRuleSet", () => {
  beforeEach(() => {
    props = {
      onAddRule: jest.fn(),
      onElseChange: jest.fn(),
      routingOptions,
      ruleSet: { id: "1" }
    };

    wrapper = shallow(
      <RoutingRuleSet {...props}>
        <div>I am a child</div>
      </RoutingRuleSet>
    );
  });

  it("should render children", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should allow change of ELSE condition", () => {
    const data = { name: "hello", value: "there" };
    wrapper.find("[data-test='select-else']").simulate("change", data);
    expect(props.onElseChange).toHaveBeenLastCalledWith(data);
  });

  it("should allow adding a rule", () => {
    const found = wrapper.find("[data-test='btn-add-rule']");
    found.simulate("click");
    expect(props.onAddRule).toHaveBeenCalledWith(props.ruleSet.id);
  });
});
