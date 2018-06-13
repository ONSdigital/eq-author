import React from "react";
import { shallow } from "enzyme";

import RoutingRuleset from "./RoutingRuleset";

import routingOptions from "./mockstate";

let wrapper, props;

describe("components/RoutingRuleset", () => {
  beforeEach(() => {
    props = {
      onAddRule: jest.fn(),
      onElseChange: jest.fn(),
      routingOptions,
      routingRuleSet: {
        id: "1"
      }
    };

    wrapper = shallow(
      <RoutingRuleset {...props}>
        <div>I am a child</div>
      </RoutingRuleset>
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
    expect(props.onAddRule).toHaveBeenCalledWith(props.routingRuleSet.id);
  });
});
