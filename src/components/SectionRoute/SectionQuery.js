import React from "react";
import { Query } from "react-apollo";
import query from "./Section.graphql";
import PropTypes from "prop-types";

const SectionQuery = ({ id, children }) => (
  <Query query={query} variables={{ id }}>
    {children}
  </Query>
);

SectionQuery.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default SectionQuery;
