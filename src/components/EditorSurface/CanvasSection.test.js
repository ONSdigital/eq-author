import React from "react";
import { shallow } from "enzyme";
import CanvasSection from "./CanvasSection";

let component, handleBlur, focusOnSection;

const Child = () => <div />;

describe("BasicSection", () => {
  beforeEach(() => {
    handleBlur = jest.fn();
    focusOnSection = jest.fn();

    component = shallow(
      <CanvasSection
        id="foo"
        onBlur={handleBlur}
        isFocused
        focusOnSection={focusOnSection}
      >
        <Child />
      </CanvasSection>
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });

  it("should handle blur", () => {
    component.simulate("blur");
    expect(handleBlur).toHaveBeenCalled();
  });
});
