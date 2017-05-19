import actionMatching from "tests/actionMatching";
import { createJsonFile, createTextFile } from "tests/createFile";
import { CALL_HISTORY_METHOD } from "react-router-redux";
import {
  SURVEY_LOAD_FAILURE,
  SURVEY_LOAD_SUCCESS,
  SURVEY_LOADING,
  SURVEY_CLEAR,
  META_UPDATE,
  loadSurvey,
  loadingSurvey,
  loadSurveyFailure,
  loadSurveySuccess,
  clearSurvey,
  updateMeta
} from "actions/survey";

describe("actions/survey", () => {
  describe("loadSurvey", () => {
    let dispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    it("dispatches error if no file supplied", () => {
      loadSurvey()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        actionMatching(SURVEY_LOAD_FAILURE)
      );
      expect(dispatch).not.toHaveBeenCalledWith(actionMatching(SURVEY_LOADING));
    });

    it("dispatches error if not valid JSON file", () => {
      expect.assertions(2);

      return loadSurvey(createTextFile("LOL"))(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOADING));
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(SURVEY_LOAD_FAILURE)
        );
      });
    });

    it("dispatches success actions if JSON is valid", () => {
      expect.assertions(2);

      const file = createJsonFile();

      return loadSurvey(file)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOADING));
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(SURVEY_LOAD_SUCCESS)
        );
      });
    });

    it("redirects to  success actions if JSON is valid", () => {
      expect.assertions(3);

      const file = createJsonFile();

      return loadSurvey(file)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOADING));
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(SURVEY_LOAD_SUCCESS)
        );
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(CALL_HISTORY_METHOD)
        );
      });
    });
  });

  describe("loadingSurvey", () => {
    it("dispatches the correct action", () => {
      expect(loadingSurvey()).toEqual(actionMatching(SURVEY_LOADING));
    });
  });

  describe("loadSurveyFailure", () => {
    it("propagates the error as payload", () => {
      const error = new Error("foo");
      const result = loadSurveyFailure(error);

      expect(result).toEqual(actionMatching(SURVEY_LOAD_FAILURE, error));
    });
  });

  describe("loadSurveySuccess", () => {
    it("dispatches the correct action", () => {
      const result = loadSurveySuccess({});

      expect(result).toEqual(actionMatching(SURVEY_LOAD_SUCCESS));
    });
  });

  describe("clearSurvey", () => {
    it("dispatches the correct action", () => {
      expect(clearSurvey()).toEqual(actionMatching(SURVEY_CLEAR));
    });
  });

  describe("updateMeta", () => {
    it("should pass 'key' and 'value' payload", () => {
      const payload = { key: "foo", value: "bar" };
      const result = updateMeta(payload.key, payload.value);
      expect(result).toEqual(actionMatching(META_UPDATE, payload));
    });
  });
});
