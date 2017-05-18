import { CALL_HISTORY_METHOD } from "react-router-redux";
import {
  SURVEY_LOAD_FAILURE,
  SURVEY_LOAD_SUCCESS,
  SURVEY_LOADING,
  SURVEY_CLEAR,
  loadSurvey,
  loadingSurvey,
  loadSurveyFailure,
  loadSurveySuccess,
  clearSurvey
} from "actions/survey";

function actionMatching(type, payload) {
  var action = { type };

  if(arguments.length === 2) {
    action.payload = payload;
  }

  return expect.objectContaining(action);
}

function createTextFile(contents = "", name = "foo.json") {
  return new File(contents.split(""), name);
}

function createJsonFile(obj = {}, name) {
  return createTextFile(JSON.stringify(obj), name);
}

describe("actions/survey", () => {

  describe("loadSurvey", () => {
    let dispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    it("dispatches error if no file supplied", () => {
      loadSurvey()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOAD_FAILURE));
      expect(dispatch).not.toHaveBeenCalledWith(actionMatching(SURVEY_LOADING));
    });

    it("dispatches error if not valid JSON file", () => {
      expect.assertions(2);

      return loadSurvey(createTextFile("LOL"))(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOADING));
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOAD_FAILURE));
      });
    });

    it("dispatches success actions if JSON is valid", () => {
      expect.assertions(2);

      const file = createJsonFile();

      return loadSurvey(file)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOADING));
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOAD_SUCCESS));
      });
    });

    it("redirects to  success actions if JSON is valid", () => {
      expect.assertions(3);

      const file = createJsonFile();

      return loadSurvey(file)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOADING));
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOAD_SUCCESS));
        expect(dispatch).toHaveBeenCalledWith(actionMatching(CALL_HISTORY_METHOD));
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
      const error  = new Error("foo");
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
});