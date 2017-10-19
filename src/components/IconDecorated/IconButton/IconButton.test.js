import React from "react";
import { shallow } from "enzyme";

import IconButton, { Button } from "components/IconDecorated/IconButton";
import iconTest from "./icon-test.svg";

let iconButton;

describe("components/IconButton", function() {
  beforeEach(() => {
    iconButton = shallow(<IconButton icon={iconTest} title="Test" />);
  });

  it("should render an icon decorated button", function() {
    expect(iconButton).toMatchSnapshot();
  });
});

describe("components/IconButton/Button", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Button icon={iconTest} />);
  });

  it("will render Button", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have an icon", () => {
    expect(wrapper).toHaveStyleRule(
      "background",
      "transparent url(icon-test.svg) no-repeat center"
    );
  });
});
