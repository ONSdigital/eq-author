import { mapStateToProps, mapResultsToProps } from "./";

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

  let result, newPage;

  beforeEach(() => {
    newPage = {
      id: 22,
      title: "New Page"
    };

    result = {
      data: {
        createQuestionPage: newPage
      }
    };
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
});
