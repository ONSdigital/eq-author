import reducer, { defaultState } from "reducers/questionnaire/items";
import { QUESTIONNAIRE_LOAD_SUCCESS } from "actions/questionnaire";

describe("reducers/questionnaire/items", () => {
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
          type: QUESTIONNAIRE_LOAD_SUCCESS,
          payload: {
            items
          }
        }
      )
    ).toEqual(items);
  });
});
