import { graphql } from "react-apollo";
import deleteRoutingRuleSet from "graphql/deleteRoutingRuleSet.graphql";
import fragment from "graphql/fragments/page.graphql";

export const createUpdater = (routingRuleSetId, pageId) => (proxy, result) => {
  const id = `QuestionPage${pageId}`;
  const page = proxy.readFragment({
    id,
    fragment
  });

  page.routingRuleSet = null;

  proxy.writeFragment({
    id,
    fragment,
    data: page
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onDeleteRoutingRuleSet(routingRuleSetId, pageId) {
    const input = { id: routingRuleSetId };
    const update = createUpdater(routingRuleSetId, pageId);

    return mutate({
      variables: { input },
      update
    }).then(res => res.data.deleteRoutingRuleSet);
  }
});

export default graphql(deleteRoutingRuleSet, {
  props: mapMutateToProps
});
