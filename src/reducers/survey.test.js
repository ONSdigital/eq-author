import reducer, { defaultState } from "reducers/survey";
import { updateMeta } from "actions/survey";

describe("survey reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it("should handle META_UPDATE with key/value merged into survey meta", () => {
    expect(reducer([], updateMeta("title", "My title"))).toEqual({
      meta: { title: "My title" }
    });
  });
});
