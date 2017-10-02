import IntrospectionFragmentMatcher from "apollo/fragmentMatcher";

describe("apollo/fragmentMatcher", () => {
  it("should not change unexpectedly", () => {
    expect(IntrospectionFragmentMatcher).toMatchSnapshot();
  });
});
