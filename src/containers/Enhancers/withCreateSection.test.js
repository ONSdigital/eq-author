import {
  mapMutateToProps,
  createUpdater,
  redirectToNewPage
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
      const readQuery = jest.fn().mockImplementation(({ query, variables }) => {
        return { questionnaire };
      });

      const writeQuery = jest.fn();

      const updater = createUpdater(questionnaire.id, newSection.id);
      updater({ readQuery, writeQuery }, result);

      expect(readQuery).toHaveBeenCalledWith(
        expect.objectContaining({ variables: { id: questionnaire.id } })
      );

      expect(writeQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { id: questionnaire.id },
          data: {
            questionnaire
          }
        })
      );
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
