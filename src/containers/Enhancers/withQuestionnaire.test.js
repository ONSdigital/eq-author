import { mapResultsToProps, mapPropToOptions } from "./withQuestionnaire";

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

describe("containers/withQuestionnaire", () => {
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

  describe("mapOptionsToProps", () => {
    it("should pass questionnaireId as a variable", () => {
      const questionnaireId = 1;
      const options = mapPropToOptions({ questionnaireId });

      expect(options.variables).toEqual({ id: questionnaireId });
    });
  });
});
