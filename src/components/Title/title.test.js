import React from "react";
import Title from "components/Title";
import { shallow } from "enzyme";

describe("prop types", () => {
  describe("children", () => {
    it("should error when children empty", () => {
      const stubConsoleError = jest.fn();
      console.error = stubConsoleError; // eslint-disable-line no-console
      shallow(<Title />);
      expect(stubConsoleError).toBeCalled();
    });
  });
});

describe("snapshot", () => {
  it("should not have changed inadvertently", () => {
    const wrapper = shallow(<Title>eQ Author</Title>);
    expect(wrapper).toMatchSnapshot();
  });
});
