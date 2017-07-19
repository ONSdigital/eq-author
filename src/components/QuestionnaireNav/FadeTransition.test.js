import React from "react";
import { shallow } from "enzyme";
import FadeTransition from "./FadeTransition";

describe("FadeTransition", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <FadeTransition component={<div />} duration={200} in>
        Children
      </FadeTransition>
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
