import React from "react";
import { mount } from "enzyme";
import PageCanvas from "./PageCanvas";

describe("SeamlessInput", () => {
  let component;

  beforeEach(() => {
    component = mount(<PageCanvas />);
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
