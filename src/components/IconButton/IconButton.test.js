import React from "react";
import { shallow } from "enzyme";

import IconButton, { Button } from "components/IconButton";

const mockFn = jest.fn();
let iconButton;

describe("components/IconButton", function() {
  beforeEach(() => {
    iconButton = shallow(
      <IconButton icon="export" title="Export" handleClick={mockFn} />
    );
  });

  it("will render an export icon", function() {
    expect(iconButton).toMatchSnapshot();
  });

  it("will render a preview icon", function() {
    iconButton.setProps({ icon: "preview" });
    expect(iconButton).toMatchSnapshot();
  });

  it("will handleClick", function() {
    iconButton.find(Button).simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });

  it("will blow up when an non-existent icon is used", function() {
    expect(() => {
      iconButton.setProps({ icon: "not-an-icon" });
    }).toThrow();
  });
});
