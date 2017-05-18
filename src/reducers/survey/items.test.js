import reducer, { defaultState } from "reducers/survey/items";

describe("reducers/survey/items", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });
});
