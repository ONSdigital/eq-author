import React from "react";
import { mount } from "enzyme";
import { Input } from "components/Forms/Input";

const defaultValue = "I am some text";

const changeHandler = jest.fn();

describe("components/Forms/Input", () => {
  describe("Text", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Input
          id="text"
          handleChange={changeHandler}
          defaultValue={defaultValue}
        />
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

    it("should call handleChange with appropriate args", () => {
      wrapper.simulate("change", { target: { value: "hello" } });
      expect(changeHandler).toHaveBeenCalledWith({ text: "hello" });
    });
  });

  describe("Checkbox", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Input
          id="text"
          handleChange={changeHandler}
          defaultValue={defaultValue}
        />
      );
    });

    it("should render a checbox", () => {
      wrapper = mount(<Input type="checkbox" />);
      expect(wrapper.props()).toMatchObject({ type: "checkbox" });
    });

    it("should pass `defaultChecked` prop to component", () => {
      wrapper = mount(<Input type="checkbox" defaultChecked />);
      expect(wrapper.find("input").node.checked).toEqual(true);
      wrapper = mount(<Input type="checkbox" defaultChecked={false} />);
      expect(wrapper.find("input").node.checked).toEqual(false);
    });

    it("should call handleChange with appropriate args", () => {
      wrapper = mount(
        <Input
          type="checkbox"
          id="checkbox"
          handleChange={changeHandler}
          defaultChecked
        />
      );
      wrapper.simulate("change", { target: { checked: true } });
      expect(changeHandler).toHaveBeenCalledWith({ checkbox: true });
    });
  });
});
