import actionMatching from "tests/utils/actionMatching";
import { createJsonFile, createTextFile } from "tests/utils/createFile";
import { CALL_HISTORY_METHOD } from "react-router-redux";
import {
  QUESTIONNAIRE_LOAD_FAILURE,
  QUESTIONNAIRE_LOAD_SUCCESS,
  QUESTIONNAIRE_LOADING,
  QUESTIONNAIRE_CLEAR,
  loadQuestionnaire,
  loadingQuestionnaire,
  loadQuestionnaireFailure,
  loadQuestionnaireSuccess,
  clearQuestionnaire
} from "actions/questionnaire";

describe("actions/questionnaire", () => {
  describe("loadQuestionnaire", () => {
    let dispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    it("dispatches error if no file supplied", () => {
      loadQuestionnaire()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        actionMatching(QUESTIONNAIRE_LOAD_FAILURE)
      );
      expect(dispatch).not.toHaveBeenCalledWith(
        actionMatching(QUESTIONNAIRE_LOADING)
      );
    });

    it("dispatches error if not valid JSON file", () => {
      expect.assertions(2);

      return loadQuestionnaire(createTextFile("LOL"))(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(QUESTIONNAIRE_LOADING)
        );
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(QUESTIONNAIRE_LOAD_FAILURE)
        );
      });
    });

    it("dispatches success actions if JSON is valid", () => {
      expect.assertions(2);

      const file = createJsonFile();

      return loadQuestionnaire(file)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(QUESTIONNAIRE_LOADING)
        );
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(QUESTIONNAIRE_LOAD_SUCCESS)
        );
      });
    });

    it("redirects to  success actions if JSON is valid", () => {
      expect.assertions(3);

      const file = createJsonFile();

      return loadQuestionnaire(file)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(QUESTIONNAIRE_LOADING)
        );
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(QUESTIONNAIRE_LOAD_SUCCESS)
        );
        expect(dispatch).toHaveBeenCalledWith(
          actionMatching(CALL_HISTORY_METHOD)
        );
      });
    });
  });

  describe("loadingQuestionnaire", () => {
    it("dispatches the correct action", () => {
      expect(loadingQuestionnaire()).toEqual(
        actionMatching(QUESTIONNAIRE_LOADING)
      );
    });
  });

  describe("loadQuestionnaireFailure", () => {
    it("propagates the error as payload", () => {
      const error = new Error("foo");
      const result = loadQuestionnaireFailure(error);

      expect(result).toEqual(actionMatching(QUESTIONNAIRE_LOAD_FAILURE, error));
    });
  });

  describe("loadQuestionnaireSuccess", () => {
    it("dispatches the correct action", () => {
      const result = loadQuestionnaireSuccess({});

      expect(result).toEqual(actionMatching(QUESTIONNAIRE_LOAD_SUCCESS));
    });
  });

  describe("clearQuestionnaire", () => {
    it("dispatches the correct action", () => {
      expect(clearQuestionnaire()).toEqual(actionMatching(QUESTIONNAIRE_CLEAR));
    });
  });
});
