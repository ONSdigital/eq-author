import React from "react";
import { LB } from "./";
import { shallow } from "enzyme";

describe("LinkButton", () => {
  let wrapper, push, to;

  beforeEach(() => {
    push = jest.fn();
    to = "/foo";
    wrapper = shallow(<LB history={{ push }} to={to} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should navigate onClick", () => {
    wrapper.simulate("click");
    expect(push).toHaveBeenCalledWith(to);
  });
});
