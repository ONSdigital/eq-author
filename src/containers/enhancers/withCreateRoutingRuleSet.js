import { graphql } from "react-apollo";
import createRoutingRuleSet from "graphql/createRoutingRuleSet.graphql";
import fragment from "graphql/pageFragment.graphql";
import getRouting from "graphql/getRouting.graphql";

export const createUpdater = pageId => (proxy, result) => {
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
    const { pageId, questionnaireId } = ownProps.match.params;
    const input = {
      questionPageId: pageId
    };

    const update = createUpdater(pageId);

    return mutate({
      variables: { input },
      update
      // refetchQueries: res => [
      //   {
      //     query: getRouting,
      //     variables: {
      //       id: questionnaireId
      //     }
      //   }
      // ]
    });
  }
});

export default graphql(createRoutingRuleSet, {
  props: mapMutateToProps
});
