import reducer, { defaultState } from "reducers/survey/meta";
import { SURVEY_LOAD } from "actions/survey";
import { updateMeta } from "actions/survey/meta";

describe("reducers/survey/meta", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it("should handle META_UPDATE with key/value merged into survey meta", () => {
    expect(reducer({}, updateMeta("title", "My title"))).toEqual({
      title: "My title"
    });
  });

  it("should populate state with loaded data", () => {
    /* eslint-disable camelcase */
    const meta = {
      data_version: "0.0.1",
      description: "I am a description",
      legal_basis: "StatisticsOfTradeAct",
      mime_type: "application/json/ons/eq",
      questionnaire_id: "0001",
      schema_version: "0.0.1",
      id: "999",
      theme: "default",
      title: "I am a title"
    };

    expect(
      reducer(
        {},
        {
          type: SURVEY_LOAD,
          payload: {
            meta
          }
        }
      )
    ).toEqual(meta);
  });
});
