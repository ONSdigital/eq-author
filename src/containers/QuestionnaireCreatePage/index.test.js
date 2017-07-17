import { redirectToDesigner, mapMutateToProps } from "./index";

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
        expect(mutate).toHaveBeenCalledWith(
          expect.objectContaining({ variables: questionnaire })
        );
        expect(history.push).toHaveBeenCalled();
      });
    });
  });
});
