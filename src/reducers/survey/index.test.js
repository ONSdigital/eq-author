import { createStore } from "redux";

import survey from "reducers/survey/";
import meta from "reducers/survey/meta";
import items from "reducers/survey/items";

let store = createStore(survey);

describe("reducers/survey", () => {
  it("should return the expected default state from subreducers", function() {
    expect(store.getState().meta).toEqual(meta(undefined, {}));
    expect(store.getState().items).toEqual(items(undefined, {}));
  });
});
