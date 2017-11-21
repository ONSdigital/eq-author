import React from "react";
import { shallow } from "enzyme";
import Aux from "./";

describe("Aux", () => {
  it("should render children without modification", () => {
    const wrapper = shallow(
      <Aux>
        <div />
        <div />
      </Aux>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
