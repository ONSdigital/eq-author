import {
  mapStateToProps,
  mapResultsToProps,
  mapMutateToProps,
  createUpdater,
  redirectToDesigner
} from "./";

describe("containers/QuestionnaireDesignPage", () => {
  const page = {
    id: 3,
    title: "My Page"
  };
  const section = {
    id: 2,
    title: "My Section",
    pages: [page]
  };
  const questionnaire = {
    id: 1,
    title: "My Questionnaire",
    sections: [section]
  };

  let history, mutate, result, newPage, updaterFn;

  beforeEach(() => {
    history = {
      push: jest.fn()
    };

    newPage = {
      id: 22,
      title: "New Page"
    };

    result = {
      data: {
        createQuestionPage: newPage
      }
    };

    mutate = jest.fn(() => Promise.resolve(result));

    updaterFn = createUpdater(questionnaire.id, section.id);
  });

  describe("mapStateToProps", () => {
    it("should map question, section and page id's from state to props", () => {
      const params = {
        questionnaireId: 1,
        sectionId: 2,
        pageId: 3
      };
      const extraParams = {
        ...params,
        dontWantThisId: 4
      };
      const props = mapStateToProps(null, {
        match: { params: extraParams }
      });
      expect(props).toEqual(params);
    });
  });

  describe("mapResultsToProps", () => {
    it("should handle loading", () => {
      const props = mapResultsToProps({
        data: { loading: true, questionnaire: undefined },
        ownProps: { sectionId: 1, pageId: 2 }
      });
      expect(props.loading).toBe(true);
      expect(props.questionnaire).toBe(undefined);
    });

    it("should handle questionnaire data", () => {
      const props = mapResultsToProps({
        data: { loading: false, questionnaire },
        ownProps: { sectionId: section.id, pageId: page.id }
      });
      expect(props.loading).toBe(false);
      expect(props.questionnaire).toEqual(questionnaire);
      expect(props.section).toEqual(section);
      expect(props.page).toEqual(page);
    });
  });

  describe("createUpdater", () => {
    it("should update the cache pass and the result to be the correct page", () => {
      const readQuery = jest.fn().mockImplementation(({ query, variables }) => {
        return { questionnaire };
      });

      const writeQuery = jest.fn();

      updaterFn(
        {
          readQuery,
          writeQuery
        },
        result
      );

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

  describe("redirectToDesigner", () => {
    it("should redirect to the correct url", () => {
      redirectToDesigner({
        history,
        questionnaireId: questionnaire.id,
        sectionId: section.id
      })(result);

      expect(history.push).toHaveBeenCalledWith(
        `/questionnaire/${questionnaire.id}/design/${section.id}/${newPage.id}`
      );
    });
  });

  describe("mapMutateToProps", () => {
    let ownProps, props;
    beforeEach(() => {
      ownProps = {
        history,
        sectionId: section.id,
        questionnaireId: questionnaire.id
      };
      props = mapMutateToProps({ ownProps, mutate });
    });

    it("should have a onAddPage prop", () => {
      expect(props.onAddPage).toBeInstanceOf(Function);
    });

    it("should respond with an optimisticResponse", () => {
      return props.onAddPage(section.id).then(() => {
        expect(mutate.mock.calls[0][0]).toMatchObject({
          optimisticResponse: {
            createQuestionPage: {
              sectionId: section.id
            }
          }
        });
      });
    });

    it("should redirect", () => {
      return props.onAddPage().then(() => {
        expect(history.push).toHaveBeenCalled();
      });
    });
  });
});
