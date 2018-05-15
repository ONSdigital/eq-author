import getAvailableRoutingDestinations from "graphql/getAvailableRoutingDestinations.graphql";
import { graphql } from "react-apollo";

export const mapResultsToProps = ({ data, ownProps }) => {
  const {
    availableRoutingDestinations,
    loading: routingDestinationsLoading
  } = data;

  if (routingDestinationsLoading) {
    return { routingDestinationsLoading };
  }

  return {
    routingDestinationsLoading,
    availableRoutingDestinations
  };
};

export const mapPropToOptions = ({ pageId }) => ({
  variables: { pageId }
});

export default graphql(getAvailableRoutingDestinations, {
  props: mapResultsToProps,
  options: mapPropToOptions
});
