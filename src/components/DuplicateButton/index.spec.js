import React from "react";
import { shallow } from "enzyme";

import DuplicateButton from "./";

describe("Duplicate Button", () => {
  it("should render", () => {
    const wrapper = shallow(
      <DuplicateButton onClick={jest.fn()} data-test="foo" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should call on click when clicked", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <DuplicateButton onClick={onClick} data-test="foo" />
    );
    wrapper.find("[data-test='foo']").simulate("click", "hello");
    expect(onClick).toHaveBeenCalledWith("hello");
  });
});
