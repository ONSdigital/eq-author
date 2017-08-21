import { mapMutateToProps, deleteUpdater } from "./withDeleteAnswer";

describe("containers/QuestionnaireDesignPage/withDeleteAnswer", () => {
  let mutate, result, ownProps, onDeleteAnswer;
  let deletedAnswer, currentPage, currentSection, questionnaire;

  beforeEach(() => {
    deletedAnswer = {
      id: 2,
      sectionId: 2
    };

    currentPage = {
      id: 1,
      sectionId: 1,
      answers: [deletedAnswer]
    };

    currentSection = {
      id: 1,
      pages: [currentPage, { id: 3 }]
    };

    questionnaire = {
      id: 1,
      title: "My Questionnaire",
      sections: [currentSection]
    };

    result = {
      data: {
        deleteAnswer: deletedAnswer
      }
    };

    onDeleteAnswer = jest.fn(() => Promise.resolve());

    ownProps = {
      questionnaire,
      questionnaireId: questionnaire.id,
      sectionId: currentSection.id,
      pageId: currentPage.id,
      onDeleteAnswer
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("deleteUpdater", () => {
    it("should remove the answer from the cache", () => {
      const readQuery = jest.fn().mockImplementation(({ query, variables }) => {
        return { questionnaire };
      });
      const writeQuery = jest.fn();

      const updater = deleteUpdater(
        questionnaire.id,
        currentSection.id,
        currentPage.id,
        deletedAnswer.id
      );
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

      expect(currentPage.answers).not.toContain(deletedAnswer);
    });
  });

  describe("mapMutateToProps", () => {
    let props;

    beforeEach(() => {
      props = mapMutateToProps({ ownProps, mutate });
    });

    it("should have a onDeletePage prop", () => {
      expect(props.onDeleteAnswer).toBeInstanceOf(Function);
    });

    describe("onDeletePage", () => {
      it("should call mutate", () => {
        return props.onDeleteAnswer(deletedAnswer.id).then(() => {
          expect(mutate).toHaveBeenCalledWith(
            expect.objectContaining({
              variables: {
                id: deletedAnswer.id
              }
            })
          );
        });
      });

      it("should return promise that resolves to deletePage result", () => {
        return expect(props.onDeleteAnswer(deletedAnswer.id)).resolves.toBe(
          result
        );
      });
    });
  });
});
