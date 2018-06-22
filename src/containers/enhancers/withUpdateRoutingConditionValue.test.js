import {
  mapMutateToProps,
  createUpdater
} from "./withUpdateRoutingConditionValue";
import fragment from "graphql/fragments/routing-rule.graphql";

describe("containers/enhancers/withUpdateRoutingConditionValue", () => {
  const routingCondition = {
    id: "1"
  };

  const option = {
    id: "1"
  };

  const questionPage = {
    id: "1",
    routingRuleSet: null
  };

  let mutate, result, updateRoutingConditionValue;

  beforeEach(() => {
    updateRoutingConditionValue = {
      value: option.id
    };

    result = {
      data: {
        updateRoutingConditionValue
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
      id = `RoutingCondition${questionPage.id}`;
      writeFragment = jest.fn();
      readFragment = jest.fn(() => routingCondition);
      updater = createUpdater(routingCondition.id);
    });

    it("should update the apollo cache", () => {
      updater({ readFragment, writeFragment }, result);
      expect(readFragment).toHaveBeenCalledWith({
        id,
        fragment,
        fragmentName: "RoutingCondition"
      });
      expect(writeFragment).toHaveBeenCalledWith({
        id,
        fragment,
        fragmentName: "RoutingCondition",
        data: routingCondition
      });

      expect(routingCondition.routingValue).toMatchObject(
        updateRoutingConditionValue
      );
    });
  });

  describe("mapMutateToProps", () => {
    let props;

    beforeEach(() => {
      props = mapMutateToProps({ mutate });
    });

    it("should have a onToggleConditionOption prop", () => {
      expect(props.onUpdateRoutingConditionValue).toBeInstanceOf(Function);
    });

    it("should call mutate", () => {
      return props
        .onUpdateRoutingConditionValue(routingCondition.id, option.id)
        .then(() => {
          expect(mutate).toHaveBeenCalledWith(
            expect.objectContaining({
              variables: {
                input: {
                  conditionId: routingCondition.id,
                  optionId: option.id
                }
              }
            })
          );
        });
    });
  });
});
