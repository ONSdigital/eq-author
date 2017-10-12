import React from "react";
import { shallow } from "enzyme";

import IconLink, { StyledLink } from "components/IconLink";
import iconTest from "./icon-test.svg";

const handleClick = jest.fn();
let wrapper;

describe("components/IconLink", function() {
  beforeEach(() => {
    wrapper = shallow(
      <IconLink
        href="http://localhost"
        icon={iconTest}
        title="Test"
        handleClick={handleClick}
      />
    );
  });

  it("will render an icon", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("will handleClick", function() {
    wrapper.find(StyledLink).simulate("click");
    expect(handleClick).toHaveBeenCalled();
  });
});
