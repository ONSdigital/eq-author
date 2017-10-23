import React from "react";
import { shallow } from "enzyme";
import DateRange, { DatePicker } from "./index";

describe("Dummy/DateRange", () => {
  it("should render", () => {
    const wrapper = shallow(<DateRange />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render dummy DatePicker", () => {
    const wrapper = shallow(<DatePicker />);
    expect(wrapper).toMatchSnapshot();
  });
});
