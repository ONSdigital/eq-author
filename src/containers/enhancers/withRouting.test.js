import { mapResultsToProps, mapPropToOptions } from "./withRouting";

const routingCondition = {
  id: "1",
  comparator: "Equal",
  answer: null,
  routingValue: null
};
const routingRule = {
  id: "1",
  operation: "And",
  conditions: [routingCondition],
  goto: null
};
const routingRuleSet = {
  id: "1",
  routingRules: [routingRule],
  else: null
};
const page = {
  id: "3",
  title: "My Page",
  routingRuleSet
};
const section = {
  id: "2",
  title: "My Section",
  pages: [page]
};
const questionnaire = {
  id: "1",
  title: "My Questionnaire",
  sections: [section]
};

routingRuleSet.questionPage = page;
routingCondition.questionPage = page;

describe("containers/withRouting", () => {
  describe("mapResultsToProps", () => {
    it("should handle loading", () => {
      const props = mapResultsToProps({
        data: { loading: true, questionnaire: undefined },
        ownProps: { sectionId: "1", pageId: "2" }
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
      const options = mapPropToOptions({ questionnaireId: "1" });
      expect(options).toMatchSnapshot();
    });
  });
});
