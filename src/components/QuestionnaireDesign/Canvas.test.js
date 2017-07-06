import React from "react";
import { shallow } from "enzyme";
import Canvas from "./Canvas";

describe("Canvas", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Canvas>Children</Canvas>);
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
