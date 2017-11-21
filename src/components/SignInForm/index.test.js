import React from "react";
import SignInForm from "./index";
import { shallow } from "enzyme";

describe("SignInForm", () => {
  it("should render", () => {
    expect(shallow(<SignInForm />)).toMatchSnapshot();
  });
});
