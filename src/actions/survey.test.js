import {
  SURVEY_LOAD_FAILURE,
  SURVEY_LOAD_SUCCESS,
  loadSurvey,
  loadSurveyFailure,
  loadSurveySuccess
} from "actions/survey";

function actionMatching(type, payload = expect.anything()) {
  return expect.objectContaining({ type, payload });
}

function createTextFile(contents = "", name = "foo.json") {
  return new File(contents.split(""), name);
}

function createJsonFile(obj = {}, name) {
  return createTextFile(JSON.stringify(obj), name);
}

describe("actions", () => {

  describe("loadSurvey", () => {
    let history, dispatch;

    beforeEach(() => {
      dispatch = jest.fn();
      history = {
        push : jest.fn()
      };
    });

    it("dispatches error if no file supplied", () => {
      loadSurvey(null, history)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOAD_FAILURE));
    });

    it("dispatches error if not valid JSON file", () => {
      expect.assertions(1);

      const file = createTextFile("LOL");

      return loadSurvey(file, history)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOAD_FAILURE));
      });
    });

    it("dispatches success actions if JSON is valid", () => {
      expect.assertions(1);

      const file = createJsonFile();

      return loadSurvey(file, history)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith(actionMatching(SURVEY_LOAD_SUCCESS));
      });
    });

    it("redirects to  success actions if JSON is valid", () => {
      expect.assertions(1);

      const file = createJsonFile();

      return loadSurvey(file, history)(dispatch).then(() => {
        expect(history.push).toHaveBeenCalledWith("/create");
      });
    });
  });

  test("loadSurveyFailure", () => {
    const error  = new Error("foo");
    const result = loadSurveyFailure(error);

    expect(result).toEqual(actionMatching(SURVEY_LOAD_FAILURE, error));
  });

  describe("loadSurveySuccess", () => {
    const result = loadSurveySuccess({});

    expect(result).toEqual(actionMatching(SURVEY_LOAD_SUCCESS));
  });
});