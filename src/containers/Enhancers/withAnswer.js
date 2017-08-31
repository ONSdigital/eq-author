import GetAnswer from "graphql/getAnswer.graphql";
import { graphql } from "react-apollo";

export const mapResultsToProps = ({ data, ownProps }) => {
  const { answer, loading } = data;
  return {
    answer,
    loading,
    ...ownProps
  };
};

export default graphql(GetAnswer, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.answerId } })
});
