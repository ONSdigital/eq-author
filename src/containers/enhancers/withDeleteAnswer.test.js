import {
  mapMutateToProps,
  deleteUpdater
} from "containers/enhancers/withDeleteAnswer";

describe("containers/QuestionnaireDesignPage/withDeleteAnswer", () => {
  let mutate, result;
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
      props = mapMutateToProps({ mutate });
    });

    it("should have a onDeleteAnswer prop", () => {
      expect(props.onDeleteAnswer).toBeInstanceOf(Function);
    });

    it("should call mutate when onDeleteAnswer is invoked", () => {
      return props.onDeleteAnswer(currentPage.id, deletedAnswer.id).then(() => {
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
