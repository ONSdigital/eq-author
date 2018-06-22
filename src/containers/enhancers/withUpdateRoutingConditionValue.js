import { graphql } from "react-apollo";
import updateRoutingConditionValue from "graphql/updateRoutingConditionValue.graphql";
import fragment from "graphql/fragments/routing-rule.graphql";

export const createUpdater = routingConditionId => (proxy, result) => {
  const id = `RoutingCondition${routingConditionId}`;
  const routingCondition = proxy.readFragment({
    id,
    fragment,
    fragmentName: "RoutingCondition"
  });

  routingCondition.routingValue = result.data.updateRoutingConditionValue;

  proxy.writeFragment({
    id,
    fragment,
    fragmentName: "RoutingCondition",
    data: routingCondition
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onUpdateRoutingConditionValue(conditionId, optionId) {
    const input = {
      conditionId,
      optionId
    };

    const update = createUpdater(conditionId);

    return mutate({
      variables: { input },
      update
    }).then(res => res.data.updateRoutingConditionValue);
  }
});

export default graphql(updateRoutingConditionValue, {
  props: mapMutateToProps
});
