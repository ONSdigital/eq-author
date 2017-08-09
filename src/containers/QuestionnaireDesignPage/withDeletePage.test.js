import {
  mapMutateToProps,
  createUpdater,
  getNextPage,
  handleDeletion
} from "./withDeletePage";

describe("containers/QuestionnaireDesignPage/withDeletePage", () => {
  let history, mutate, result, ownProps, onAddPage;
  let deletedPage, currentPage, currentSection, targetSection, questionnaire;

  beforeEach(() => {
    deletedPage = {
      id: 2,
      sectionId: 2
    };

    currentPage = {
      id: 1,
      sectionId: 1
    };

    currentSection = {
      id: 1,
      pages: [currentPage, { id: 3 }]
    };

    targetSection = {
      id: 2,
      pages: [deletedPage]
    };

    questionnaire = {
      id: 1,
      title: "My Questionnaire",
      sections: [currentSection, targetSection]
    };

    history = {
      push: jest.fn()
    };

    result = {
      data: {
        deletePage: deletedPage
      }
    };

    onAddPage = jest.fn(() => Promise.resolve());

    ownProps = {
      questionnaire,
      questionnaireId: questionnaire.id,
      sectionId: currentSection.id,
      pageId: currentPage.id,
      history,
      onAddPage
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("createUpdater", () => {
    it("should remove the page from the cache", () => {
      const readQuery = jest.fn().mockImplementation(({ query, variables }) => {
        return { questionnaire };
      });
      const writeQuery = jest.fn();

      const updater = createUpdater(
        questionnaire.id,
        targetSection.id,
        deletedPage.id
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

      expect(targetSection.pages).not.toContain(deletedPage);
    });
  });

  describe("getNextPage", () => {
    describe("when page is first in section", () => {
      it("should select first page when only one page", () => {
        const pages = [{ id: 1 }];
        const { id } = getNextPage(pages, 1);

        expect(id).toBe(1);
      });

      it("should select following page when more than one page", () => {
        const pages = [{ id: 1 }, { id: 2 }];
        const { id } = getNextPage(pages, 1);

        expect(id).toBe(2);
      });
    });

    describe("when page is not first in section", () => {
      it("should select previous page", () => {
        const pages = [{ id: 1 }, { id: 2 }];
        const { id } = getNextPage(pages, 2);

        expect(id).toBe(1);
      });
    });
  });

  describe("mapMutateToProps", () => {
    let props;

    beforeEach(() => {
      props = mapMutateToProps({ ownProps, mutate });
    });

    it("should have a onDeletePage prop", () => {
      expect(props.onDeletePage).toBeInstanceOf(Function);
    });

    describe("onDeletePage", () => {
      it("should call mutate", () => {
        return props
          .onDeletePage(deletedPage.sectionId, deletedPage.id)
          .then(() => {
            expect(mutate).toHaveBeenCalledWith(
              expect.objectContaining({
                variables: {
                  id: deletedPage.id
                }
              })
            );
          });
      });

      it("should return promise that resolves to deletePage result", () => {
        return expect(
          props.onDeletePage(deletedPage.sectionId, deletedPage.id)
        ).resolves.toBe(result);
      });

      it("should respond with an optimisticResponse", () => {
        return props
          .onDeletePage(deletedPage.sectionId, deletedPage.id)
          .then(() => {
            expect(mutate.mock.calls[0][0]).toMatchObject({
              optimisticResponse: {
                deletePage: {
                  __typename: "Page",
                  id: deletedPage.id
                }
              }
            });
          });
      });
    });
  });

  describe("handleDeletion", () => {
    describe("when only one page in section", () => {
      it("should add new page", () => {
        return handleDeletion(
          ownProps,
          targetSection.id,
          deletedPage.id,
          result
        ).then(() => {
          expect(onAddPage).toHaveBeenCalledWith(targetSection.id);
        });
      });
    });

    describe("when more than one page in section", () => {
      describe("and deleting the current page", () => {
        it("should redirect to another page", () => {
          return handleDeletion(
            ownProps,
            currentSection.id,
            currentPage.id,
            result
          ).then(() => {
            expect(history.push).toHaveBeenCalled();
          });
        });
      });

      describe("and not deleting the current page", () => {
        it("should do nothing", () => {
          return handleDeletion(
            ownProps,
            currentSection.id,
            3,
            result
          ).then(() => {
            expect(history.push).not.toHaveBeenCalled();
            expect(onAddPage).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
