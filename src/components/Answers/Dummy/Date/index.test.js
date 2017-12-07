import React from "react";
import { shallow } from "enzyme";
import Date from "./index";

describe("Dummy/Date", () => {
  it("should render", () => {
    const wrapper = shallow(<Date />);
    expect(wrapper).toMatchSnapshot();
  });
});
