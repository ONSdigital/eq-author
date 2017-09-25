import React from "react";
import { mount } from "enzyme";

import IconButton, { Button } from "components/IconButton";
import iconTest from "./icon-test.svg";

const mockFn = jest.fn();
let iconButton;

describe("components/IconButton", function() {
  beforeEach(() => {
    iconButton = mount(
      <IconButton icon={iconTest} title="Test" handleClick={mockFn} />
    );
  });

  it("will render an icon", function() {
    expect(iconButton).toMatchSnapshot();
  });

  it("will handleClick", function() {
    iconButton.find(Button).simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
});
