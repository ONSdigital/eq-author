import { mapMutateToProps, deleteUpdater } from "./withDeleteAnswer";

describe("containers/QuestionnaireDesignPage/withDeleteAnswer", () => {
  let mutate, result, ownProps, onDeleteAnswer;
  let deletedAnswer, currentPage;

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

    result = {
      data: {
        deleteAnswer: deletedAnswer
      }
    };

    onDeleteAnswer = jest.fn(() => Promise.resolve());

    ownProps = {
      pageId: currentPage.id,
      onDeleteAnswer
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("deleteUpdater", () => {
    it("should remove the answer from the cache", () => {
      const writeFragment = jest.fn();
      const readFragment = jest.fn().mockImplementation(() => currentPage);
      const id = `QuestionPage${currentPage.id}`;

      const updater = deleteUpdater(currentPage.id, deletedAnswer.id);
      updater({ readFragment, writeFragment }, result);

      expect(readFragment).toHaveBeenCalledWith(
        expect.objectContaining({ id })
      );

      expect(writeFragment).toHaveBeenCalledWith(
        expect.objectContaining({
          id,
          data: currentPage
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
