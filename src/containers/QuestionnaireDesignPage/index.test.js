import { mapStateToProps, mapResultsToProps, createUpdater } from "./";

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

  it("should mapStateToProps", () => {
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

  it("should handle loading in mapResultsToProps", () => {
    const props = mapResultsToProps({
      data: { loading: true, questionnaire: undefined },
      ownProps: { sectionId: 1, pageId: 2 }
    });
    expect(props.loading).toBe(true);
    expect(props.questionnaire).toBe(undefined);
  });

  it("should handle questionnaire in mapResultsToProps", () => {
    const props = mapResultsToProps({
      data: { loading: false, questionnaire },
      ownProps: { sectionId: section.id, pageId: page.id }
    });
    expect(props.loading).toBe(false);
    expect(props.questionnaire).toEqual(questionnaire);
    expect(props.section).toEqual(section);
    expect(props.page).toEqual(page);
  });

  describe("createUpdater", () => {
    let updaterFn;
    let result;
    let newPage = {
      id: 22,
      title: "New Page"
    };

    beforeEach(() => {
      updaterFn = createUpdater(questionnaire.id, section.id);
      result = {
        data: {
          createQuestionPage: newPage
        }
      };
    });

    it("should have the correct values passed to readQuery/writeQuery and the result to be the correct page", () => {
      const readQuery = jest.fn().mockImplementation(({ query, variables }) => {
        expect(variables.id).toEqual(questionnaire.id);
        return { questionnaire };
      });

      const writeQuery = jest
        .fn()
        .mockImplementation(({ query, variables, data }) => {
          expect(variables.id).toEqual(questionnaire.id);
          expect(data.questionnaire.sections[0].pages).toContain(newPage);
        });

      updaterFn(
        {
          readQuery,
          writeQuery
        },
        result
      );
    });
  });
});
