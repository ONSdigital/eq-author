import React from "react";
import { shallow } from "enzyme";
import CanvasSection from "./CanvasSection";

let component, handleFocus, handleBlur;

const Child = () => <div />;

describe("CanvasSection", () => {
  beforeEach(() => {
    handleFocus = jest.fn();
    handleBlur = jest.fn();

    component = shallow(
      <CanvasSection id="foo" onFocus={handleFocus} onBlur={handleBlur} focused>
        <Child />
      </CanvasSection>
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });

  it("should handle focus event", () => {
    component.simulate("focus");
    expect(handleFocus).toHaveBeenCalledWith("foo");
  });

  it("should handle blur", () => {
    component.simulate("blur");
    expect(handleBlur).toHaveBeenCalled();
  });
});
