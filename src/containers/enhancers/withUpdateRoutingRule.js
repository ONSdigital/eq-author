import updateRoutingRule from "graphql/updateRoutingRule.graphql";
import { graphql } from "react-apollo";

export const mapMutateToProps = ({ mutate }) => ({
  onUpdateRoutingRule: routingRule =>
    mutate({
      variables: { input: routingRule }
      // optimisticResponse: {
      //   updateRoutingRule: {
      //     ...rule,
      //     goto: {
      //       ...rule.goto,
      //       ...goto,
      //       plaintextTitle: "Loading.."
      //     }
      //   }
      // }
    })
});

export default graphql(updateRoutingRule, {
  props: mapMutateToProps
});
