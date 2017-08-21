import React from "react";

import { mount } from "enzyme";
import DeleteButton from "components/DeleteButton";

describe("DeleteButton", () => {
  it("should render", () => {
    expect(mount(<DeleteButton size="small" />)).toMatchSnapshot("small");
    expect(mount(<DeleteButton size="medium" />)).toMatchSnapshot("medium");
    expect(mount(<DeleteButton size="large" />)).toMatchSnapshot("largeu");
  });

  it("should invoke callback when clicked", () => {
    const onClickCallback = jest.fn();
    const wrapper = mount(<DeleteButton onClick={onClickCallback} />);

    wrapper.simulate("click");

    expect(onClickCallback).toHaveBeenCalled();
  });

  it("should display an &times;", () => {
    const wrapper = mount(<DeleteButton />);

    expect(wrapper.text()).toEqual("×");
  });
});
