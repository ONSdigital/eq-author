import React from "react";
import { mount } from "enzyme";
import Number, { SpinnerButton } from "components/Forms/Number";

const defaultValue = "0";

const handleChange = jest.fn();

describe("components/Forms/Input", () => {
  describe("Number", () => {
    let numberWithSpinner;

    beforeEach(() => {
      numberWithSpinner = mount(
        <Number id="number" onChange={handleChange} value={defaultValue} />
      );
    });

    it("should render correctly with spinner buttons", () => {
      expect(numberWithSpinner).toMatchSnapshot("withSpinner");
    });

    it("should render correctly without spinner buttons", () => {
      expect(numberWithSpinner).toMatchSnapshot("withoutSpinner");
    });

    it("should set the input type to number", () => {
      expect(numberWithSpinner.find("input").node.type).toEqual("number");
    });

    it("should pass `defaultValue` prop to component when type=number", () => {
      expect(numberWithSpinner.find("input").node.value).toEqual("0");
    });

    it("should set `defaultValue` to value in state", () => {
      const wrapper = mount(
        <Number id="number" onChange={handleChange} value={"5"} />
      );
      expect(wrapper.state("value")).toEqual("5");
    });

    it("should call onChange with appropriate args", () => {
      numberWithSpinner
        .find("input")
        .simulate("change", { target: { value: "3" } });
      expect(handleChange).toHaveBeenCalledWith({
        name: "number",
        value: "3"
      });
    });

    it("should change internal state when input change fired", () => {
      const wrapper = mount(<Number id="number" value={"5"} />);
      wrapper.find("input").simulate("change", { target: { value: "3" } });
      expect(wrapper.state("value")).toEqual("3");
    });

    describe("spinner buttons", () => {
      it("should increase the value when up button pressed", () => {
        numberWithSpinner.find(SpinnerButton).at(0).simulate("click");
        expect(numberWithSpinner.state("value")).toEqual("1");
      });

      it("should decrease the value when down button pressed", () => {
        numberWithSpinner.find(SpinnerButton).at(1).simulate("click");
        expect(numberWithSpinner.state("value")).toEqual("-1");
      });
    });
  });
});
