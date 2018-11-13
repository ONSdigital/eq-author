import React from "react";
import { withApollo, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import QuestionPageEditor from "components/QuestionPageEditor";
import EditorLayout from "components/EditorLayout";

import { renderAnswer } from "./answers";
import { colors } from "constants/theme";

import IconInfo from "./icon-info.svg?inline";
import IconText from "components/IconText";

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

const PageTitle = styled.h1`
  font-size: 1.4em;
  margin: 0 0 1em;
`;

const Description = styled.div`
  margin-bottom: 1em;
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

const NoAnswers = styled.div`
  margin-bottom: 1em;
  padding: 2em;
  border-radius: 4px;
  border: 2px dashed #b5c4cb;
  text-align: center;
  color: ${colors.secondary};
`;

const Error = styled.div`
  padding: 0.5em 1em;
  margin-bottom: 1em;
  border-radius: 4px;
  border: 2px dashed #b5c4cb;
  text-align: center;
  color: ${colors.secondary};
  font-size: 0.9em;
`;

export class UnwrappedQuestionPageRoute extends React.Component {
  render() {
    if (this.props.loading) {
      return null;
    }

    /*  eslint-disable react/no-danger */
    const { questionPage } = this.props.data;
    const { description, guidance, answers } = questionPage;

    let title = questionPage.title.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");

    if (!title) {
      title = <Error>Missing Page Title</Error>;
    } else {
      title = <div dangerouslySetInnerHTML={{ __html: title }} />;
    }

    return (
      <EditorLayout page={questionPage}>
        <Container>
          <PageTitle>{title}</PageTitle>

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
          {answers.length ? (
            <Answers>{answers.map(renderAnswer)}</Answers>
          ) : (
            <NoAnswers>
              <IconText icon={IconInfo}>
                No answers have been added to this question.
              </IconText>
            </NoAnswers>
          )}
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
