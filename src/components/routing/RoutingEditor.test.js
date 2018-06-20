import RoutingEditor from "./RoutingEditor";
import React from "react";
import { shallow } from "enzyme";
import { merge } from "lodash";

const createWrapper = (props, render = shallow) => {
  return render(<RoutingEditor {...props} />);
};

describe("RoutingEditor", () => {
  let wrapper, props;

  const questionnaire = {
    id: "1"
  };

  const section = {
    id: "1"
  };

  const page = {
    id: "1"
  };

  const answer = {
    id: "1",
    type: "Number"
  };

  const multipleChoiceAnswer = {
    ...answer,
    type: "Checkbox",
    options: [
      {
        id: "1",
        label: "Option 1"
      },
      {
        id: "2",
        label: "Option 2"
      }
    ]
  };

  const availableRoutingDestinations = [
    {
      id: "2",
      __typename: "QuestionPage",
      section: {
        id: "1"
      }
    },
    {
      id: "3",
      __typename: "QuestionPage",
      section: {
        id: "1"
      }
    },
    {
      id: "2",
      __typename: "Section"
    },
    {
      id: "3",
      __typename: "Section"
    }
  ];

  const routingValue = {
    value: []
  };

  const routingCondition = {
    id: "1",
    comparator: "Equal",
    questionPage: page,
    answer: null,
    routingValue
  };

  const routingRule = {
    id: "1",
    operation: "And",
    conditions: [],
    goto: null
  };

  const routingRuleSet = {
    id: "1",
    routingRules: [],
    questionPage: page,
    else: null
  };

  const pageWithRoutingRuleSet = {
    ...page,
    routingRuleSet
  };

  const pageWithRoutingRules = {
    ...pageWithRoutingRuleSet,
    routingRuleSet: {
      routingRules: [routingRule]
    }
  };

  const pageWithRoutingConditions = {
    ...pageWithRoutingRules,
    routingRuleSet: {
      routingRules: [
        {
          ...routingRule,
          conditions: [routingCondition]
        }
      ]
    }
  };

  beforeEach(() => {
    props = {
      questionnaire,
      section,
      page,
      questionnaireId: questionnaire.id,
      sectionId: section.id,
      pageId: page.id,
      onAddRoutingRuleSet: jest.fn(),
      onUpdateRoutingRuleSet: jest.fn(),
      onAddRoutingRule: jest.fn(),
      onUpdateRoutingRule: jest.fn(),
      onDeleteRoutingRule: jest.fn(),
      onAddRoutingCondition: jest.fn(),
      onUpdateRoutingCondition: jest.fn(),
      onDeleteRoutingCondition: jest.fn(),
      onToggleConditionOption: jest.fn()
    };

    wrapper = createWrapper(props);
  });

  it("should render loading state", () => {
    const withLoading = merge(props, { loading: true });

    const wrapper = createWrapper(withLoading);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when no routing rule set", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("routing rule set", () => {
    beforeEach(() => {
      const withRoutingRuleSet = merge(props, {
        page: pageWithRoutingRuleSet,
        availableRoutingDestinations
      });

      wrapper = createWrapper(withRoutingRuleSet);
    });

    it("should render routing rule set", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should handle adding routing rule", () => {
      wrapper.find("RoutingRuleSet").simulate("addRule");
      expect(props.onAddRoutingRule).toHaveBeenCalledWith(routingRuleSet.id);
    });

    it("should handle changing else destination", () => {
      wrapper.find("RoutingRuleSet").simulate("elseChange", {
        value: "QuestionPage_3"
      });

      expect(props.onUpdateRoutingRuleSet).toHaveBeenCalledWith({
        id: routingRuleSet.id,
        else: {
          sectionId: "1",
          pageId: "3"
        }
      });
    });
  });

  describe("routing rules", () => {
    beforeEach(() => {
      const withRoutingRules = merge(props, {
        page: pageWithRoutingRules
      });

      wrapper = createWrapper(withRoutingRules);
    });

    it("should render routing rules", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should handle adding a routing rule", () => {
      wrapper.find("RoutingRule").simulate("addRule");
      expect(props.onAddRoutingRule).toHaveBeenCalledWith(routingRuleSet.id);
    });

    it("should handle deleting a routing rule", () => {
      wrapper.find("RoutingRule").simulate("deleteRule");
      expect(props.onDeleteRoutingRule).toHaveBeenCalledWith(
        routingRuleSet.id,
        routingRule.id
      );
    });

    it("should handle changing the THEN destination", () => {
      wrapper.find("RoutingRule").simulate("thenChange", {
        value: "Section_2"
      });
      expect(props.onUpdateRoutingRule).toHaveBeenCalledWith({
        id: routingRule.id,
        goto: {
          sectionId: "2",
          pageId: null
        }
      });
    });

    it("should handle adding a routing condition", () => {
      wrapper.find("RoutingStatement").simulate("addCondition");
      expect(props.onAddRoutingCondition).toHaveBeenCalledWith(routingRule.id);
    });
  });

  describe("routing conditions", () => {
    it("should render routing conditions - no answer provided", () => {
      const withRoutingConditions = merge(props, {
        page: pageWithRoutingConditions
      });

      wrapper = createWrapper(withRoutingConditions);
      expect(wrapper).toMatchSnapshot();
    });

    it("should render routing conditions - basic answer", () => {
      const withRoutingConditions = merge(props, {
        page: {
          ...pageWithRoutingConditions,
          routingRuleSet: {
            routingRules: [
              {
                ...routingRule,
                conditions: [
                  {
                    ...routingCondition,
                    answer
                  }
                ]
              }
            ]
          },
          answers: [answer]
        }
      });

      wrapper = createWrapper(withRoutingConditions);
      expect(wrapper).toMatchSnapshot();
    });

    describe("multiple choice answer", () => {
      beforeEach(() => {
        const withRoutingConditions = merge(props, {
          page: {
            ...pageWithRoutingConditions,
            routingRuleSet: {
              routingRules: [
                {
                  ...routingRule,
                  conditions: [
                    {
                      ...routingCondition,
                      answer: multipleChoiceAnswer
                    }
                  ]
                }
              ]
            },
            answers: [multipleChoiceAnswer]
          }
        });

        wrapper = createWrapper(withRoutingConditions);
      });

      it("should render routing conditions - multiple choice answer", () => {
        expect(wrapper).toMatchSnapshot();
      });

      it("should handle removing routing conditions", () => {
        wrapper.find("RoutingCondition").simulate("remove");
        expect(props.onDeleteRoutingCondition).toHaveBeenCalledWith(
          routingRule.id,
          routingCondition.id
        );
      });

      it("should handle page change", () => {
        wrapper.find("RoutingCondition").simulate("pageChange", {
          value: page.id
        });

        expect(props.onUpdateRoutingCondition).toHaveBeenCalledWith({
          id: routingCondition.id,
          questionPageId: page.id
        });
      });

      it("should handle toggling options", () => {
        wrapper
          .find("MultipleChoiceAnswerOptionsSelector")
          .simulate("optionSelectionChange", {
            name: `${routingCondition.id}_1`,
            value: true
          });

        expect(props.onToggleConditionOption).toHaveBeenCalledWith(
          routingCondition.id,
          "1",
          true
        );
      });
    });
  });
});
