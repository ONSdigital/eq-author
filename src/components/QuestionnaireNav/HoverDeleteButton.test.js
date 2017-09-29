import React from "react";
import { shallow } from "enzyme";
import HoverDeleteButton from "./HoverDeleteButton";

describe("HoverDeleteButton", () => {
  let wrapper;
  let handleClick;

  beforeEach(() => {
    handleClick = jest.fn();
    wrapper = shallow(<HoverDeleteButton onClick={handleClick} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle click event", () => {
    wrapper.simulate("click");

    expect(handleClick).toHaveBeenCalled();
  });
});
