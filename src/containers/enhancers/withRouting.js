import getRoutingQuery from "graphql/getRouting.graphql";
import { graphql } from "react-apollo";
import findById from "utils/findById";
import { get, filter, map } from "lodash";

export const mapResultsToProps = ({ data, ownProps }) => {
  const { questionnaire, loading } = data;
  const { sectionId, pageId } = ownProps;

  if (loading) {
    return { loading };
  }

  if (!sectionId) {
    return {
      loading,
      questionnaire
    };
  }

  const section = findById(questionnaire.sections, sectionId);
  const page = findById(get(section, "pages"), pageId);

  return {
    loading,
    questionnaire,
    section,
    page
  };
};

export const mapPropToOptions = props => ({
  variables: { id: props.questionnaireId }
});

export const mapDestinationsToRoutingOptions = props => {
  const destinations = map(props.availableRoutingDestinations, destination => ({
    ...destination,
    id: destination.__typename + "_" + destination.id
  }));

  return destinations;
};

export default graphql(getRoutingQuery, {
  props: mapResultsToProps,
  options: mapPropToOptions,
  destinations: mapDestinationsToRoutingOptions
});
