import React from "react";
import { shallow } from "enzyme";
import DateRange from "./index";

describe("DateRange", () => {
  it("should render", () => {
    const wrapper = shallow(<DateRange />);
    expect(wrapper).toMatchSnapshot();
  });
});
