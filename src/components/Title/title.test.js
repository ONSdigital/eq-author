import React from "react";
import Title from "components/Title";
import renderer from "react-test-renderer";
import { stubConsoleError } from "tests/utils/stubConsoleError";
import { assert } from "sinon";

describe("Prop types work as expected", () => {
  stubConsoleError();
  it("Should error when children is empty", () => {
    renderer.create(<Title />);
    assert.called(console.error); // eslint-disable-line no-console
  });
});

describe("Should match snapshot", () => {
  it("Should not have changed inadvertently", () => {
    const tree = renderer.create(<Title>eQ Author</Title>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
