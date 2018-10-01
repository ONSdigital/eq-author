import React from "react";
import { withApollo, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import QuestionPageEditor from "components/QuestionPageEditor";
import EditorLayout from "components/EditorLayout";
import Error from "./answers/ValidationError";

import { renderAnswer } from "./answers";

const Container = styled.div`
  padding: 2em;
  max-width: 40em;
  font-size: 1.1em;
  p {
    margin: 0 0 1em;
  }
  p:last-of-type {
    margin-bottom: 0;
  }
  em {
    background-color: #dce5b0;
    padding: 0 0.125em;
    font-style: normal;
  }
  span[data-piped] {
    background-color: #e0e0e0;
    padding: 0 0.125em;
    border-radius: 4px;
    white-space: pre;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 0 0 1em;
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

    const title = questionPage.title.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");

    return (
      <EditorLayout page={questionPage}>
        <Container>
          <Title
            dangerouslySetInnerHTML={{
              __html: title || <Error>Missing Title</Error>
            }}
          />

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
        </Container>
      </EditorLayout>
    );
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
