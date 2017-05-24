import reducer, { defaultState } from "reducers/survey/items";
import { SURVEY_LOAD_SUCCESS } from "actions/survey";

describe("reducers/survey/items", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it("should populate state with loaded data", () => {
    const items = {
      sections: {},
      questions: {},
      answers: {}
    };

    expect(
      reducer(
        {},
        {
          type: SURVEY_LOAD_SUCCESS,
          payload: {
            items
          }
        }
      )
    ).toEqual(items);
  });
});
