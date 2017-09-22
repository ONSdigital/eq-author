import {
  redirectToDesigner,
  mapMutateToProps,
  updateQuestionnaireList
} from "./index";

import getQuestionnaireList from "graphql/getQuestionnaireList.graphql";

let history, mutate, results;

const page = {
  id: 3
};
const section = {
  id: 2,
  pages: [page]
};
const questionnaire = {
  id: 1,
  sections: [section]
};

describe("containers/QuestionnaireCreatePage", () => {
  beforeEach(() => {
    results = {
      data: { createQuestionnaire: questionnaire }
    };

    history = {
      push: jest.fn()
    };

    mutate = jest.fn(() => Promise.resolve(results));
  });

  describe("redirectToDesigner", () => {
    it("should redirect to correct location", () => {
      redirectToDesigner(history)(results);

      expect(history.push).toHaveBeenCalledWith(
        `/questionnaire/${questionnaire.id}/design/${section.id}/${page.id}`
      );
    });
  });

  describe("mapMutateToProps", () => {
    it("should have a createQuestionnaire prop", () => {
      const ownProps = { history };
      const props = mapMutateToProps({ ownProps, mutate });

      expect(props.createQuestionnaire).toBeInstanceOf(Function);
    });

    it("should redirect after mutation", () => {
      const ownProps = { history };
      const props = mapMutateToProps({ ownProps, mutate });

      return props.createQuestionnaire(questionnaire).then(() => {
        expect(mutate).toHaveBeenCalledWith({
          variables: { input: questionnaire }
        });
        expect(history.push).toHaveBeenCalled();
      });
    });
  });

  describe("updateQuestionnaireList", () => {
    let proxy;
    let readQuery;
    let writeQuery;
    let data;

    beforeEach(() => {
      data = {
        questionnaires: [
          {
            id: 1
          },
          {
            id: 2
          }
        ]
      };

      readQuery = jest.fn(() => data);

      writeQuery = jest.fn();

      proxy = {
        readQuery,
        writeQuery
      };
    });

    it("should update the getQuestionnaireList query with new questionnaire.", () => {
      const newQuestionnaire = { id: 3 };
      updateQuestionnaireList(proxy, {
        data: { createQuestionnaire: newQuestionnaire }
      });

      expect(readQuery).toHaveBeenCalledWith({
        query: getQuestionnaireList
      });
      expect(writeQuery).toHaveBeenCalledWith({
        query: getQuestionnaireList,
        data: {
          questionnaires: [
            {
              id: 1
            },
            {
              id: 2
            },
            newQuestionnaire
          ]
        }
      });
    });
  });
});
