import getRoutingQuery from "graphql/getRouting.graphql";
import { graphql } from "react-apollo";

export const mapPropsToOptions = ({ match: { params } }) => ({
  variables: params
});

export default graphql(getRoutingQuery, {
  options: mapPropsToOptions
});
