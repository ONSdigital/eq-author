import { graphql } from "react-apollo";
import deleteRoutingRuleSet from "graphql/deleteRoutingRuleSet.graphql";

import gql from "graphql-tag";

const fragment = gql`
  fragment DeleteRoutingRuleSetFragment on QuestionPage {
    id
    routingRuleSet {
      id
    }
  }
`;

export const createUpdater = (routingRuleSetId, pageId) => (proxy, result) => {
  const id = `QuestionPage${pageId}`;
  const page = proxy.readFragment({
    id,
    fragment: fragment
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
