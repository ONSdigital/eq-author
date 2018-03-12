import React from "react";
import { shallow } from "enzyme";

import RoutingRuleset from "./RoutingRuleset";

import sections from "./mockstate";

let wrapper, props;

describe("components/RoutingRuleset", () => {
  beforeEach(() => {
    props = {
      onAddRule: jest.fn(),
      onElseChange: jest.fn(),
      sections
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
    wrapper.find("[data-test='btn-add-rule']").simulate("click");
    expect(props.onAddRule).toHaveBeenCalled();
  });
});
