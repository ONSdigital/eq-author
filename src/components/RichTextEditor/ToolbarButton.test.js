import React from "react";

import ToolbarButton from "components/RichTextEditor/ToolbarButton";

import { mount } from "enzyme";

describe("ToolbarButton", () => {
  it("matches snapshot", () => {
    const wrapper = mount(<ToolbarButton>Button</ToolbarButton>); // eslint-disable-line react/jsx-no-bind
    expect(wrapper).toMatchSnapshot();
  });

  it("should style appropriately when active", () => {
    const wrapper = mount(<ToolbarButton active>Button</ToolbarButton>); // eslint-disable-line react/jsx-no-bind
    expect(wrapper).toMatchSnapshot();
  });
});
