import {
  mapMutateToProps,
  createUpdater,
  redirectToNewPage,
  fragment
} from "./withCreateSection";

describe("containers/QuestionnaireDesignPage/withCreateSection", () => {
  const questionnaire = {
    id: 1,
    title: "My Questionnaire",
    sections: []
  };

  let history, mutate, result, newSection, newPage, ownProps;

  beforeEach(() => {
    history = {
      push: jest.fn()
    };

    newPage = {
      id: 5
    };

    newSection = {
      id: 4,
      title: "New Section",
      pages: [newPage]
    };

    result = {
      data: {
        createSection: newSection
      }
    };

    ownProps = {
      questionnaireId: questionnaire.id,
      history
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("createUpdater", () => {
    it("should update the cache pass and the result to be the correct page", () => {
      const id = `Questionnaire${questionnaire.id}`;
      const readFragment = jest.fn(() => questionnaire);
      const writeFragment = jest.fn();

      const updater = createUpdater(questionnaire.id);
      updater({ readFragment, writeFragment }, result);

      expect(readFragment).toHaveBeenCalledWith({ id, fragment });
      expect(writeFragment).toHaveBeenCalledWith({
        id,
        fragment,
        data: questionnaire
      });
      expect(questionnaire.sections).toContain(newSection);
    });
  });

  describe("redirectToNewPage", () => {
    it("should redirect to the correct url", () => {
      redirectToNewPage(ownProps)(result);

      expect(history.push).toHaveBeenCalledWith(
        `/questionnaire/${questionnaire.id}/design/${newSection.id}/${newPage.id}`
      );
    });
  });

  describe("mapMutateToProps", () => {
    let props;

    beforeEach(() => {
      props = mapMutateToProps({ ownProps, mutate });
    });

    it("should have a onAddSection prop", () => {
      expect(props.onAddSection).toBeInstanceOf(Function);
    });

    it("should respond with an optimisticResponse", () => {
      return props.onAddSection().then(() => {
        expect(mutate.mock.calls[0][0]).toMatchObject({
          optimisticResponse: {
            createSection: {
              questionnaireId: questionnaire.id
            }
          }
        });
      });
    });

    it("should redirect", () => {
      return props.onAddSection().then(() => {
        expect(history.push).toHaveBeenCalled();
      });
    });
  });
});
