import survey from "reducers/survey/";
import { defaultState as meta } from "reducers/survey/meta";
import { defaultState as items } from "reducers/survey/items";

describe("reducers/survey", () => {
  it("should return the expected default state from subreducers", function() {
    expect(survey(undefined, {})).toEqual({
      meta,
      items
    });
  });
});
