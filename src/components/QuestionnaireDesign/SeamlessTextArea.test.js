import React from "react";
import { mount } from "enzyme";
import SeamlessTextArea from "./SeamlessTextArea";

describe("SeamlessTextArea", () => {
  let component, handleChange;

  beforeEach(() => {
    handleChange = jest.fn();

    component = mount(
      <SeamlessTextArea id="foo" value="123" onChange={handleChange} />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
