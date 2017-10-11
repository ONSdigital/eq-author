import React from "react";
import { mount } from "enzyme";

import IconLink, { StyledLink } from "components/IconLink";
import iconTest from "./icon-test.svg";

const mockFn = jest.fn();
let iconLink;

describe("components/IconButton", function() {
  beforeEach(() => {
    iconLink = mount(
      <IconLink
        href="http://localhost"
        icon={iconTest}
        title="Test"
        handleClick={mockFn}
      />
    );
  });

  it("will render an icon", function() {
    expect(iconLink).toMatchSnapshot();
  });

  it("will handleClick", function() {
    iconLink.find(StyledLink).simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
});
