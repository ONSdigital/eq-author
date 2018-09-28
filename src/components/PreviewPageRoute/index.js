import React from "react";
import { withApollo, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import QuestionPageEditor from "components/QuestionPageEditor";
import EditorLayout from "components/EditorLayout";

import { renderAnswer } from "./answers";

const Padding = styled.div`
  padding: 2em;
  max-width: 40em;
  font-size: 1.1em;
  p {
    margin: 0 0 1em;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 0 0 1em;
  em {
    background-color: #dce5b0;
  }
`;

const Description = styled.div`
  margin-bottom: 1 em;
`;

const Guidance = styled.div`
  margin-bottom: 2em;
`;

const Panel = styled.div`
  border-left: 10px solid #033e58;
  background: #eff0f9;
  padding: 1em;
`;

const Answers = styled.div`
  margin-bottom: 1em;
`;

export class UnwrappedQuestionPageRoute extends React.Component {
  render() {
    if (this.props.loading) {
      return null;
    }
    /*  eslint-disable react/no-danger */

    const { questionPage } = this.props.data;
    const { description, guidance, answers } = questionPage;

    return (
      <EditorLayout page={questionPage}>
        <Padding>
          <Title>{questionPage.plainTextTitle || "Untitled"}</Title>
          {description &&
            description !== "<p></p>" && (
              <Description dangerouslySetInnerHTML={{ __html: description }} />
            )}

          {guidance &&
            guidance !== "<p></p>" && (
              <Guidance>
                <Panel dangerouslySetInnerHTML={{ __html: guidance }} />
              </Guidance>
            )}

          <Answers>{answers.map(renderAnswer)}</Answers>
        </Padding>
      </EditorLayout>
    );
  }
}

export const QUESTION_PAGE_QUERY = gql`
  query GetQuestionPage($id: ID!) {
    questionPage(id: $id) {
      ...QuestionPage
      plainTextTitle: title(format: Plaintext)
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
