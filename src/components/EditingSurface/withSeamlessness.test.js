import React from "react";
import { shallow } from "enzyme";
import withSeamlessness from "./withSeamlessness";

describe("withSeamlessness", () => {
  const Child = props => <input type="text" {...props} />;
  Child.displayName = "Child";

  const Seamless = withSeamlessness(Child);

  let handleChange;

  beforeEach(() => {
    handleChange = jest.fn();
  });

  it("should set the displayName", () => {
    expect(Seamless.displayName).toEqual("withSeamlessness(Child)");
  });

  it("should ensure 'name' prop matches 'id' prop", () => {
    const component = shallow(
      <Seamless id="foo" value="1" onChange={handleChange} />
    );

    expect(component.prop("name")).toEqual("foo");
  });
});
