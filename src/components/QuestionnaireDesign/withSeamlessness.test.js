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

  it("should only be hidden when conditions are met", () => {
    const permutations = [
      {
        value: "",
        optional: false,
        focussed: false,
        shouldBeHidden: false
      },
      {
        value: "foo",
        optional: false,
        focussed: false,
        shouldBeHidden: false
      },
      {
        value: "",
        optional: true,
        focussed: false,
        shouldBeHidden: true
      },
      {
        value: "foo",
        optional: true,
        focussed: false,
        shouldBeHidden: false
      },
      {
        value: "",
        optional: false,
        focussed: true,
        shouldBeHidden: false
      },
      {
        value: "foo",
        optional: false,
        focussed: true,
        shouldBeHidden: false
      },
      {
        value: "",
        optional: true,
        focussed: true,
        shouldBeHidden: false
      },
      {
        value: "foo",
        optional: true,
        focussed: true,
        shouldBeHidden: false
      }
    ];

    permutations.forEach((permutation, i) => {
      const { shouldBeHidden, ...otherProps } = permutation;

      const component = shallow(
        <Seamless
          {...otherProps}
          id={`permutation-${i}`}
          onChange={handleChange}
        />
      );

      expect(component.prop("aria-hidden")).toEqual(shouldBeHidden);
    });
  });

  it("should ensure 'name' prop matches 'id' prop", () => {
    const component = shallow(
      <Seamless id="foo" value="1" onChange={handleChange} />
    );

    expect(component.prop("name")).toEqual("foo");
  });
});
