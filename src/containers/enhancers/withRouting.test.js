import { mapPropsToOptions } from "./withRouting";

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

routingRuleSet.questionPage = page;
routingCondition.questionPage = page;

describe("containers/withRouting", () => {
  describe("mapOptionsToProps", () => {
    it("should pass questionnaireId as a variable", () => {
      const match = {
        params: { questionnaireId: "1" }
      };
      const options = mapPropsToOptions({ match });
      expect(options).toMatchSnapshot();
    });
  });
});
