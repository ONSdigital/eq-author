import React from "react";
import { mount } from "enzyme";
import { Input } from "components/Forms/Input";

let wrapper;

const defaultValue = "I am some text";

describe("components/Forms/Input", () => {
  beforeEach(() => {
    wrapper = mount(<Input defaultValue={defaultValue} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a text input by default", () => {
    expect(wrapper.props()).toMatchObject({ type: "text" });
  });

  it("should render the correct type if provided", () => {
    wrapper = mount(<Input type="checkbox" />);
    expect(wrapper.props()).toMatchObject({ type: "checkbox" });
  });

  it("should pass `defaultValue` prop to component when type=text", () => {
    expect(wrapper.props().defaultValue).toEqual(defaultValue);
  });

  it("should pass `defaultChecked` prop to component when type=checkbox", () => {
    wrapper = mount(<Input type="checkbox" defaultChecked />);
    expect(wrapper.find("input").node.checked).toEqual(true);
    wrapper = mount(<Input type="checkbox" defaultChecked={false} />);
    expect(wrapper.find("input").node.checked).toEqual(false);
  });

  it("should call handleChange with appropriate args", () => {
    const handleChange = jest.fn();
    wrapper = mount(<Input id="text" handleChange={handleChange} />);
    wrapper.simulate("change", { target: { value: "hello" } });
    expect(handleChange).toHaveBeenCalledWith({ text: "hello" });
    wrapper = mount(
      <Input
        type="checkbox"
        id="checkbox"
        handleChange={handleChange}
        defaultChecked
      />
    );
    wrapper.simulate("change", { target: { checked: true } });
    expect(handleChange).toHaveBeenCalledWith({ checkbox: true });
  });
});
