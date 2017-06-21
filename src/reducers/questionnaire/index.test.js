import questionnaire from "reducers/questionnaire/";
import { defaultState as items } from "reducers/questionnaire/items";

describe("reducers/questionnaire", () => {
  it("should return the expected default state from subreducers", function() {
    expect(questionnaire(undefined, {})).toEqual({
      items
    });
  });
});
