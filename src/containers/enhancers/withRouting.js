import getRoutingQuery from "graphql/getRouting.graphql";
import { graphql } from "react-apollo";

export const mapResultsToProps = ({ data, ownProps }) => {
  const {
    questionnaire,
    loading,
    availableRoutingDestinations,
    section,
    questionPage
  } = data;
  const { sectionId } = ownProps.match.params;

  if (loading) {
    return { loading };
  }

  if (!sectionId) {
    return {
      loading,
      questionnaire
    };
  }

  return {
    loading,
    questionnaire,
    section,
    page: questionPage,
    availableRoutingDestinations
  };
};

export const mapPropsToOptions = ({ match: { params } }) => ({
  variables: params
});

export default graphql(getRoutingQuery, {
  props: mapResultsToProps,
  options: mapPropsToOptions
});
