import React from "react";
import { mount } from "enzyme";
import Number, { SpinnerButton } from "components/Forms/Number";

const defaultValue = "0";

let handleChange;

describe("components/Forms/Input", () => {
  describe("Number", () => {
    let numberWithSpinner;
    let numberWithoutSpinner;
    let numberWithMinMax;

    beforeEach(() => {
      handleChange = jest.fn();
      numberWithSpinner = mount(
        <Number id="number" onChange={handleChange} value={defaultValue} />
      );
      numberWithoutSpinner = mount(
        <Number id="number" onChange={handleChange} value={defaultValue} />
      );
      numberWithMinMax = mount(
        <Number
          id="number"
          onChange={handleChange}
          value={defaultValue}
          min={0}
          max={100}
        />
      );
    });

    it("should render correctly with spinner buttons", () => {
      expect(numberWithSpinner).toMatchSnapshot();
    });

    it("should render correctly without spinner buttons", () => {
      expect(numberWithoutSpinner).toMatchSnapshot();
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

    describe("spinner buttons", () => {
      it("should increase the value when up button pressed", () => {
        numberWithSpinner.find(SpinnerButton).at(0).simulate("click");
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: "1"
        });
      });

      it("should decrease the value when down button pressed", () => {
        numberWithSpinner.find(SpinnerButton).at(1).simulate("click");
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: "-1"
        });
      });
    });

    describe("min/max", () => {
      it("should not go over the max", () => {
        numberWithMinMax.setProps({
          value: "100"
        });
        numberWithMinMax.find(SpinnerButton).at(0).simulate("click");
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: "100"
        });
      });

      it("should not go over the max when changed", () => {
        numberWithMinMax.setProps({
          value: "101"
        });
        numberWithMinMax.find("input").simulate("change");
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: "100"
        });
      });

      it("should not go under the min", () => {
        numberWithMinMax.find(SpinnerButton).at(1).simulate("click");
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: "0"
        });
      });

      it("should not go under the min when changed", () => {
        numberWithMinMax.setProps({
          value: "-1"
        });
        numberWithMinMax.find("input").simulate("change");
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: "0"
        });
      });
    });
  });
});
