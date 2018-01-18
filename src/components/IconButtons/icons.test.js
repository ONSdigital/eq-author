import React from "react";
import { shallow } from "enzyme";
import { AddPageIcon } from "./icons";

describe("AddPageIcon", () => {
  it("should render correctly", () => {
    expect(shallow(<AddPageIcon />)).toMatchSnapshot();
  });
});
