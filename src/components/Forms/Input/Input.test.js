import React from "react";
import { mount } from "enzyme";
import { Input } from "components/Forms/Input";

const defaultValue = "I am some text";

const handleChange = jest.fn();

describe("components/Forms/Input", () => {
  describe("Text", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Input id="text" onChange={handleChange} defaultValue={defaultValue} />
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render a text input by default", () => {
      expect(wrapper.props()).toMatchObject({ type: "text" });
    });

    it("should pass `defaultValue` prop to component when type=text", () => {
      expect(wrapper.props().defaultValue).toEqual(defaultValue);
    });

    it("should call onChange with appropriate args", () => {
      wrapper.simulate("change", { target: { value: "hello" } });
      expect(handleChange).toHaveBeenCalledWith({ text: "hello" });
    });
  });

  describe("Checkbox", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Input
          id="my-checkbox"
          type="checkbox"
          onChange={handleChange}
          defaultChecked={false}
        />
      );
    });

    it("should render a checkbox", () => {
      expect(wrapper.find("input").node.type).toEqual("checkbox");
    });

    it("should pass `defaultChecked` prop to component", () => {
      wrapper = mount(<Input type="checkbox" defaultChecked />);
      expect(wrapper.find("input").node.checked).toEqual(true);
      wrapper = mount(<Input type="checkbox" defaultChecked={false} />);
      expect(wrapper.find("input").node.checked).toEqual(false);
    });

    it("should call onChange with appropriate args", () => {
      wrapper.simulate("change", { target: { checked: true } });
      expect(handleChange).toHaveBeenCalledWith({ "my-checkbox": true });
    });
  });
});
