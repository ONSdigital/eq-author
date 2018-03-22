import React from "react";
import { shallow } from "enzyme";

import RoutingRule from "./RoutingRule";

import sections from "./mockstate";

let wrapper, props;

describe("components/RoutingRule", () => {
  beforeEach(() => {
    props = {
      onAddRule: jest.fn(),
      onDeleteRule: jest.fn(),
      onThenChange: jest.fn(),
      title: "Test",
      page: sections[0].pages[0],
      sections
    };

    wrapper = shallow(
      <RoutingRule {...props}>
        <div>I am a child</div>
      </RoutingRule>
    );
  });

  it("should render children", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render empty message if no children are passed", () => {
    wrapper = shallow(<RoutingRule {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should allow deleting rule", () => {
    wrapper.find("[data-test='btn-delete']").simulate("click");
    expect(props.onDeleteRule).toHaveBeenCalled();
  });

  it("should allow change of THEN condition", () => {
    const data = { name: "hello", value: "there" };
    wrapper.find("[data-test='select-then']").simulate("change", data);
    expect(props.onThenChange).toHaveBeenLastCalledWith(data);
  });
});
