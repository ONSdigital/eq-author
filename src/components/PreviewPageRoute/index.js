import React from "react";
import { withApollo, Query } from "react-apollo";
import gql from "graphql-tag";

import QuestionPageEditor from "../QuestionPageEditor";

export class UnwrappedQuestionPageRoute extends React.Component {
  render() {
    return <div>Preview</div>;
  }
}

export const QUESTION_PAGE_QUERY = gql`
  query GetQuestionPage($id: ID!) {
    questionPage(id: $id) {
      ...QuestionPage
    }
  }

  ${QuestionPageEditor.fragments.QuestionPage}
`;

export default withApollo(props => (
  <Query
    query={QUESTION_PAGE_QUERY}
    variables={{ id: props.match.params.pageId }}
  >
    {innerProps => <UnwrappedQuestionPageRoute {...innerProps} {...props} />}
  </Query>
));
