import React from "react";
import { shallow } from "enzyme";
import "styled-components-test-utils/lib/jest";

import IconLink from "components/IconLink";
import iconTest from "./icon-test.svg?inline";

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
});
