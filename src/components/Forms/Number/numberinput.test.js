import React from "react";
import { mount } from "enzyme";
import Number from "components/Forms/Number";

const defaultValue = 0;

let handleChange;

describe("components/Forms/Input", () => {
  describe("Number", () => {
    let number;
    let numberWithMinMax;

    beforeEach(() => {
      handleChange = jest.fn();
      number = mount(
        <Number
          id="number"
          onChange={handleChange}
          value={defaultValue}
          min={-10}
          max={10}
        />
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

    it("should render correctly", () => {
      expect(number).toMatchSnapshot();
    });

    it("should call onChange with appropriate args", () => {
      number.find("input").simulate("change", { target: { value: 3 } });
      expect(handleChange).toHaveBeenCalledWith({
        name: "number",
        value: 3
      });
    });

    describe("min/max", () => {
      it("should not go over the max when changed", () => {
        numberWithMinMax
          .find("input")
          .simulate("change", { name: "number", target: { value: 101 } });
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: 100
        });
      });

      it("should not go under the min when changed", () => {
        numberWithMinMax
          .find("input")
          .simulate("change", { name: "number", target: { value: -1 } });
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: 0
        });
      });

      it("should default to min when NaN", () => {
        numberWithMinMax
          .find("input")
          .simulate("change", { name: "number", target: { value: " " } });
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: 0
        });
      });

      it("should default to 0 when NaN and no min specified", () => {
        numberWithMinMax
          .find("input")
          .simulate("change", { name: "number", target: { value: " " } });
        expect(handleChange).toBeCalledWith({
          name: "number",
          value: 0
        });
      });
    });
  });
});
