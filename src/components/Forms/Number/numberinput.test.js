import React from "react";
import { mount } from "enzyme";
import Number, { SpinnerButton } from "components/Forms/Number";

const defaultValue = "0";

const handleChange = jest.fn();

describe("components/Forms/Input", () => {
  describe("Number", () => {
    let numberWithSpinner;
    let numberWithoutSpinner;

    beforeEach(() => {
      numberWithSpinner = mount(
        <Number id="number" onChange={handleChange} value={defaultValue} />
      );
      numberWithoutSpinner = mount(
        <Number id="number" onChange={handleChange} value={defaultValue} />
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
  });
});
