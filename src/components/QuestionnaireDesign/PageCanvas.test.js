import React from "react";
import { shallow } from "enzyme";
import PageCanvas from "./PageCanvas";

describe("SeamlessInput", () => {
  let component;

  beforeEach(() => {
    component = shallow(<PageCanvas>Children</PageCanvas>);
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
