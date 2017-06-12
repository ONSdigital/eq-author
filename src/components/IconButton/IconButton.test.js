import React from "react";
import { shallow } from "enzyme";

import IconButton, { icons } from "components/IconButton";

const mockFn = jest.fn();
let iconButton;

describe("components/IconButton", function() {
  beforeEach(() => {
    iconButton = shallow(
      <IconButton icon="export" title="Export" handleClick={mockFn} />
    );
  });

  it("will render an icon", function() {
    expect(iconButton.children().props().src).toContain(icons.export);
  });

  it("will render a title", function() {
    expect(iconButton.props().title).toEqual("Export");
  });

  it("will handleClick", function() {
    iconButton.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("will blow up when an non-existant icon is used", function() {
    expect(() => {
      iconButton.setProps({ icon: "not-an-icon" });
    }).toThrow();
  });
});
