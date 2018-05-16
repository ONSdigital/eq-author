import React from "react";
import { Query } from "react-apollo";
import query from "./QuestionPage.graphql";
import PropTypes from "prop-types";

const QuestionPageQuery = ({ id, children }) => (
  <Query query={query} variables={{ id }}>
    {children}
  </Query>
);

QuestionPageQuery.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default QuestionPageQuery;
