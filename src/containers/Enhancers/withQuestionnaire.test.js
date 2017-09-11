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
      expect(props).toMatchSnapshot();
    });

    it("should handle questionnaire data", () => {
      const props = mapResultsToProps({
        data: { loading: false, questionnaire },
        ownProps: { sectionId: section.id, pageId: page.id }
      });

      expect(props).toMatchSnapshot();
    });

    it("should handle no section selected", () => {
      const props = mapResultsToProps({
        data: { loading: false, questionnaire },
        ownProps: {}
      });

      expect(props).toMatchSnapshot();
    });
  });

  describe("mapOptionsToProps", () => {
    it("should pass questionnaireId as a variable", () => {
      const options = mapPropToOptions({ questionnaireId: 1 });
      expect(options).toMatchSnapshot();
    });
  });
});
