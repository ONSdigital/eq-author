import { mapMutateToProps, createUpdater } from "./withCreateRoutingCondition";
import fragment from "graphql/fragments/routing-rule.graphql";

describe("containers/enhancers/withCreateRoutingRule", () => {
  const routingRule = {
    id: "1",
    conditions: []
  };

  let mutate, ownProps, result, createRoutingCondition;

  beforeEach(() => {
    ownProps = {
      page: {
        id: "1",
        answers: [
          {
            id: "1"
          }
        ]
      }
    };

    createRoutingCondition = {
      id: "1",
      operation: "And",
      conditions: [],
      goto: null
    };

    result = {
      data: {
        createRoutingCondition
      }
    };

    mutate = jest.fn(() => Promise.resolve(result));
  });

  describe("createUpdater", () => {
    let id;
    let writeFragment;
    let readFragment;
    let updater;

    beforeEach(() => {
      id = `RoutingRule${routingRule.id}`;
      writeFragment = jest.fn();
      readFragment = jest.fn(() => routingRule);
      updater = createUpdater(routingRule.id);
    });

    it("should update the apollo cache", () => {
      updater({ readFragment, writeFragment }, result);
      expect(readFragment).toHaveBeenCalledWith({
        id,
        fragment,
        fragmentName: "RoutingRule"
      });
      expect(writeFragment).toHaveBeenCalledWith({
        id,
        fragment,
        data: routingRule,
        fragmentName: "RoutingRule"
      });

      expect(routingRule.conditions).toContainEqual(createRoutingCondition);
    });
  });

  describe("mapMutateToProps", () => {
    let props;

    beforeEach(() => {
      props = mapMutateToProps({ mutate, ownProps });
    });

    it("should have a onAddRoutingCondition prop", () => {
      expect(props.onAddRoutingCondition).toBeInstanceOf(Function);
    });

    it("should throw error if no answer on page", () => {
      ownProps.page.answers.splice(0, 1);
      expect(() =>
        props.onAddRoutingCondition(routingRule.id)
      ).toThrowErrorMatchingSnapshot();
    });

    it("should call mutate", () => {
      return props.onAddRoutingCondition(routingRule.id).then(() => {
        expect(mutate).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: {
                comparator: "Equal",
                questionPageId: ownProps.page.id,
                routingRuleId: routingRule.id,
                answerId: ownProps.page.answers[0].id
              }
            }
          })
        );
      });
    });
  });
});
