import React from "react";
import { shallow } from "enzyme";
import Toast from "./index";

jest.useFakeTimers();

describe("Toast", () => {
  const render = (props = {}, children = <span>hello</span>) =>
    shallow(
      <Toast id="1" {...props}>
        {children}
      </Toast>
    );

  it("should render", () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  it("should enforce a single child policy", () => {
    expect(() => {
      render({}, "hello world");
    }).toThrow();
  });

  it("should propagate onClose props to child", () => {
    const handleClose = jest.fn();
    const wrapper = render({ onClose: handleClose });
    wrapper.find("span").simulate("close");

    expect(handleClose).toHaveBeenCalled();
  });
});
