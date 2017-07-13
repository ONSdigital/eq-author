import React from "react";
import { shallow } from "enzyme";
import NotFoundPage from "./";

let component;

describe("CanvasSection", () => {
  beforeEach(() => {
    component = shallow(<NotFoundPage />);
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
