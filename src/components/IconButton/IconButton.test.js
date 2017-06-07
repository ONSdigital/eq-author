import React from "react";
import { shallow } from "enzyme";

import IconButton, { icons } from "components/IconButton";

describe("components/IconButton", function() {
  const mockFn = jest.fn();
  const iconButton = shallow(
    <IconButton icon={icons.exportIcon} title="Export" handleClick={mockFn} />
  );

  it("will render an icon", function() {
    expect(iconButton.children().props().src).toContain(icons.exportIcon);
  });

  it("will render a title", function() {
    expect(iconButton.props().title).toEqual("Export");
  });

  it("will handleClick", function() {
    iconButton.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
});
