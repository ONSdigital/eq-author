import React from "react";
import { shallow } from "enzyme";
import { AlertList, Alert } from "./Alert";

let wrapper;

describe("components/Modal/Alert", () => {
  beforeEach(() => {
    wrapper = shallow(
      <AlertList>
        <Alert>This is an alert</Alert>
        <Alert>This is another alert</Alert>
      </AlertList>
    );
  });

  it("should render an alert", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
