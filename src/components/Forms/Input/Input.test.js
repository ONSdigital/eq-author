import React from "react";
import { shallow } from "enzyme";
import { Input } from "components/Forms/Input";

describe("components/Forms/Input", () => {
  it("should render correctly", function() {
    const wrapper = shallow(<Input />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a text input by default", function() {
    const wrapper = shallow(<Input />);
    expect(wrapper.props()).toMatchObject({ type: "text" });
  });

  it("should render the correct type", function() {
    const wrapper = shallow(<Input type="checkbox" />);
    expect(wrapper.props()).toMatchObject({ type: "checkbox" });
  });
});
