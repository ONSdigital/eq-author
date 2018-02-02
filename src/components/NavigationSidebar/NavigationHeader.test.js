import React from "react";
import { shallow } from "enzyme";
import NavigationHeader from "components/NavigationSidebar/NavigationHeader";

describe("NavigationHeader", () => {
  it("should render", () => {
    expect(shallow(<NavigationHeader />)).toMatchSnapshot();
  });
});
