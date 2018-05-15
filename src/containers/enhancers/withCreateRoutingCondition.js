import { graphql } from "react-apollo";
import createRoutingCondition from "graphql/createRoutingCondition.graphql";
import fragment from "graphql/fragments/routing-rule.graphql";
import { first, isNil, get } from "lodash";

export const createUpdater = routingRuleId => (proxy, result) => {
  const id = `RoutingRule${routingRuleId}`;
  const routingRule = proxy.readFragment({
    id,
    fragment,
    fragmentName: "RoutingRule"
  });

  routingRule.conditions.push(result.data.createRoutingCondition);

  proxy.writeFragment({
    id,
    fragment,
    fragmentName: "RoutingRule",
    data: routingRule
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onAddRoutingCondition(routingRuleId) {
    const answer = first(ownProps.page.answers);

    const input = {
      comparator: "Equal",
      questionPageId: ownProps.page.id,
      answerId: get(answer, "id"),
      routingRuleId
    };

    const update = createUpdater(routingRuleId);

    return mutate({
      variables: { input },
      update
    }).then(res => res.data.createRoutingCondition);
  }
});

export default graphql(createRoutingCondition, {
  props: mapMutateToProps
});
