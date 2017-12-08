import React from "react";
import { shallow } from "enzyme";
import DateRange from "./index";

describe("DateRange", () => {
  it("should render", () => {
    const wrapper = shallow(<DateRange />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render legendTo/legendFrom props", () => {
    const wrapper = shallow(<DateRange legendTo="Foo" legendBar="Bar" />);
    expect(wrapper).toMatchSnapshot();
  });
});
