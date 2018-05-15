import { graphql } from "react-apollo";
import createRoutingRuleSet from "graphql/createRoutingRuleSet.graphql";
import fragment from "graphql/pageFragment.graphql";
import getRouting from "graphql/getRouting.graphql";

export const createUpdater = ({ pageId }) => (proxy, result) => {
  const id = `QuestionPage${pageId}`;

  const questionPage = proxy.readFragment({
    id,
    fragment
  });

  questionPage.routingRuleSet = result.data.createRoutingRuleSet;

  proxy.writeFragment({
    id,
    fragment,
    data: questionPage
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onAddRoutingRuleSet() {
    const input = {
      questionPageId: ownProps.pageId
    };

    const update = createUpdater(ownProps);

    return mutate({
      variables: { input },
      update,
      refetchQueries: res => [
        {
          query: getRouting,
          variables: {
            id: ownProps.questionnaireId
          }
        }
      ]
    });
  }
});

export default graphql(createRoutingRuleSet, {
  props: mapMutateToProps
});
