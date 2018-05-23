import React from "react";
import { shallow } from "enzyme";

import RoutingRuleResultSelector from "./RoutingRuleResultSelector";
import sections from "./mockstate";

let wrapper, props;

describe("components/RoutingRuleResultSelector", () => {
  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      label: "Test",
      id: "test-select",
      sections
    };

    wrapper = shallow(<RoutingRuleResultSelector {...props} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render as disabled given the relevant prop", () => {
    wrapper = shallow(<RoutingRuleResultSelector {...props} disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should allow change of goto select", () => {
    const data = { name: "hello", value: "there" };
    wrapper.find(`#${props.id}`).simulate("change", data);
    expect(props.onChange).toHaveBeenLastCalledWith(data);
  });

  it("should pass disabled prop onto select field", () => {
    wrapper.setProps({ disabled: true });
    const select = wrapper.find('[data-test="result-selector"]');
    expect(select.props().disabled).toBe(true);
  });
});
