import React from "react";
import { shallow } from "enzyme";
import "styled-components-test-utils/lib/jest";

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

describe("components/IconLink/StyledLink", () => {
  beforeEach(() => {
    wrapper = shallow(<StyledLink icon={iconTest} />);
  });

  it("will render StyledLink", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have an icon", () => {
    expect(wrapper).toHaveStyleRule(
      "background",
      "transparent url(icon-test.svg) no-repeat center"
    );
  });
});
