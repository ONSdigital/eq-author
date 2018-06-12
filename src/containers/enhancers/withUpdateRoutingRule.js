import updateRoutingRule from "graphql/updateRoutingRule.graphql";
import { graphql } from "react-apollo";

export const mapMutateToProps = ({ mutate }) => ({
  onUpdateRoutingRule: (sectionId, pageId, routingRule) => {
    const { id } = routingRule;

    const goto = sectionId
      ? {
          id: sectionId,
          __typename: "Section"
        }
      : {
          id: pageId,
          __typename: "QuestionPage"
        };

    return mutate({
      variables: {
        input: {
          id,
          goto: {
            sectionId,
            pageId
          }
        }
      },
      optimisticResponse: {
        updateRoutingRule: {
          ...routingRule,
          goto: {
            ...routingRule.goto,
            ...goto,
            plaintextTitle: "Loading.."
          }
        }
      }
    });
  }
});

export default graphql(updateRoutingRule, {
  props: mapMutateToProps
});
