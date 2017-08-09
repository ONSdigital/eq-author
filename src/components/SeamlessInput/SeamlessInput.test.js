import React from "react";
import { mount } from "enzyme";
import SeamlessInput from "./SeamlessInput";

describe("SeamlessInput", () => {
  let component, handleChange;

  beforeEach(() => {
    handleChange = jest.fn();

    component = mount(
      <SeamlessInput id="foo" value="123" onChange={handleChange} />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
