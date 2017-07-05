import React from "react";
import { shallow } from "enzyme";
import PageSection from "./PageSection";

let component, handleFocus;

const Child = () => <div />;

describe("PageSection", () => {
  beforeEach(() => {
    handleFocus = jest.fn();

    component = shallow(
      <PageSection id="foo" onFocus={handleFocus} focussed>
        <Child />
      </PageSection>
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });

  it("should handle focus event", () => {
    component.simulate("focus");
    expect(handleFocus).toHaveBeenCalledWith("foo");
  });

  it("should pass on its focussed prop", () => {
    expect(component.find(Child).prop("focussed")).toBe(true);
  });
});
