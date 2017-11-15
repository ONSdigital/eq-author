import {
  mapMutateToProps,
  deleteUpdater,
  handleDeletion
} from "./withDeleteSection";
import fragment from "graphql/questionnaireFragment.graphql";

describe("containers/QuestionnaireDesignPage/withDeletePage", () => {
  let history, mutate, result, ownProps, onAddSection, raiseToast;
  let deletedPage, currentPage, currentSection, targetSection, questionnaire;

  beforeEach(() => {
    deletedPage = {
      id: "2",
      sectionId: "2"
    };

    currentPage = {
      id: "1",
      sectionId: "1"
    };

    currentSection = {
      id: "1",
      pages: [currentPage, { id: "3" }]
    };

    targetSection = {
      id: "2",
      pages: [deletedPage]
    };

    questionnaire = {
      id: "1",
      title: "My Questionnaire",
      sections: [currentSection, targetSection]
    };

    history = {
      push: jest.fn()
    };

    result = {
      data: {
        deleteSection: deletedPage
      }
    };

    onAddSection = jest.fn(() => Promise.resolve());
    raiseToast = jest.fn(() => Promise.resolve());

    ownProps = {
      questionnaire,
      questionnaireId: questionnaire.id,
      sectionId: currentSection.id,
      pageId: currentPage.id,
      history,
      onAddSection,
      raiseToast
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("deleteUpdater", () => {
    it("should remove the section from the cache", () => {
      const id = `Questionnaire${questionnaire.id}`;
      const readFragment = jest.fn(() => questionnaire);
      const writeFragment = jest.fn();

      const updater = deleteUpdater(questionnaire.id, targetSection.id);
      updater({ readFragment, writeFragment }, result);

      expect(readFragment).toHaveBeenCalledWith({ id, fragment });
      expect(writeFragment).toHaveBeenCalledWith({
        id,
        fragment,
        data: questionnaire
      });
      expect(questionnaire.sections).not.toContain(targetSection);
    });
  });

  describe("mapMutateToProps", () => {
    let props;

    beforeEach(() => {
      props = mapMutateToProps({ ownProps, mutate });
    });

    it("should have a onDeleteSection prop", () => {
      expect(props.onDeleteSection).toBeInstanceOf(Function);
    });

    describe("onDeleteSection", () => {
      it("should call mutate", () => {
        return props.onDeleteSection(targetSection.id).then(() => {
          expect(mutate).toHaveBeenCalledWith(
            expect.objectContaining({
              variables: {
                input: { id: targetSection.id }
              }
            })
          );
        });
      });

      it("should raise a toast after invoking onDeleteSection", () => {
        return props.onDeleteSection(targetSection.id).then(() => {
          expect(raiseToast).toHaveBeenCalledWith(
            `Section${targetSection.id}`,
            expect.stringContaining("Section"),
            "undeleteSection",
            expect.objectContaining({
              questionnaireId: ownProps.questionnaireId,
              sectionId: targetSection.id
            })
          );
        });
      });

      it("should display number of deleted pages in toast", () => {
        return props.onDeleteSection(targetSection.id).then(() => {
          expect(raiseToast).toHaveBeenCalledWith(
            `Section${targetSection.id}`,
            expect.stringContaining("1 page"),
            "undeleteSection",
            expect.objectContaining({
              questionnaireId: ownProps.questionnaireId,
              sectionId: targetSection.id
            })
          );
        });
      });

      it("should pluralize the number of deleted pages in toast", () => {
        targetSection.pages.push({
          id: "3",
          sectionId: "2"
        });

        return props.onDeleteSection(targetSection.id).then(() => {
          expect(raiseToast).toHaveBeenCalledWith(
            `Section${targetSection.id}`,
            expect.stringContaining("2 pages"),
            "undeleteSection",
            expect.objectContaining({
              questionnaireId: ownProps.questionnaireId,
              sectionId: targetSection.id
            })
          );
        });
      });

      it("should return promise that resolves to deleteSection result", () => {
        return expect(props.onDeleteSection(targetSection.id)).resolves.toBe(
          result
        );
      });
    });
  });

  describe("handleDeletion", () => {
    describe("when only one section in questionnaire", () => {
      beforeEach(() => {
        questionnaire.sections = [targetSection];
      });

      it("should add new section", () => {
        return handleDeletion(
          ownProps,
          questionnaire.id,
          targetSection.id
        ).then(() => {
          expect(onAddSection).toHaveBeenCalled();
        });
      });
    });

    describe("when more than one section in questionnaire", () => {
      describe("and deleting the current section", () => {
        it("should redirect to another section", () => {
          return handleDeletion(
            ownProps,
            questionnaire.id,
            currentSection.id
          ).then(() => {
            expect(history.push).toHaveBeenCalled();
          });
        });
      });

      describe("and not deleting the current page", () => {
        it("should do nothing", () => {
          return handleDeletion(
            ownProps,
            questionnaire.id,
            targetSection.id,
            result
          ).then(() => {
            expect(history.push).not.toHaveBeenCalled();
            expect(onAddSection).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
