import React from "react";
import { Query } from "react-apollo";
import query from "./MovePage.graphql";
import PropTypes from "prop-types";

const MovePageQuery = ({ questionnaireId, children }) => (
  <Query query={query} variables={{ id: questionnaireId }}>
    {({ loading, data }) => {
      return children({ loading, data });
    }}
  </Query>
);

MovePageQuery.propTypes = {
  questionnaireId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default MovePageQuery;
