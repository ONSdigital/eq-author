/*  eslint-disable react/no-danger */
import React from "react";
import { withApollo, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { get, flowRight } from "lodash";
import { connect } from "react-redux";

import QuestionPageEditor from "components/QuestionPageEditor";
import EditorLayout from "components/EditorLayout";
import Error from "./Error";

import { TransitionGroup } from "react-transition-group";
import Transition from "./Transition";

import { getProperties } from "redux/properties/reducer";
import { getQuestionPage } from "redux/page/reducer";
import { renderAnswer } from "./answers";
import { colors } from "constants/theme";

import IconInfo from "./icon-info.svg?inline";
import iconChevron from "./icon-chevron.svg";
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

const Details = styled.div`
  margin-bottom: 1em;
`;

const DetailsTitle = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.primary};
  margin-bottom: 0.5em;

  &::before {
    width: 32px;
    height: 32px;
    display: inline-block;
    margin-left: -10px;
    content: url(${iconChevron});
    transform: rotate(90deg);
  }
`;

const DetailsContent = styled.div`
  border-left: 2px solid #999999;
  margin-left: 6px;
  padding: 0.2em 0 0.2em 1em;
`;

export class UnwrappedQuestionPagePreviewRoute extends React.Component {
  render() {
    if (this.props.loading) {
      return null;
    }

    const { questionPage, properties } = this.props;
    const {
      description,
      guidance,
      answers,
      definition,
      additionalInfo
    } = questionPage;

    let title = questionPage.title.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");

    return (
      <EditorLayout page={questionPage}>
        <Container>
          <PageTitle>
            {title ? (
              <div dangerouslySetInnerHTML={{ __html: title }} />
            ) : (
              <Error large>Missing Page Title</Error>
            )}
          </PageTitle>

          <TransitionGroup>
            {properties.description.enabled && (
              <Transition key="description">
                <div>
                  {description === "<p></p>" ? (
                    <Error large>Missing description</Error>
                  ) : (
                    <Description
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                </div>
              </Transition>
            )}

            {definition &&
              properties.definition.enabled && (
                <Transition key="definition">
                  <div>
                    <Details>
                      <DetailsTitle>
                        {definition.label || (
                          <Error small>Missing definition label</Error>
                        )}
                      </DetailsTitle>
                      <DetailsContent>
                        {definition.content === "<p></p>" ? (
                          <Error large margin={false}>
                            Missing definition content
                          </Error>
                        ) : (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: definition.content
                            }}
                          />
                        )}
                      </DetailsContent>
                    </Details>
                  </div>
                </Transition>
              )}

            {properties.guidance.enabled && (
              <Transition key="guidance">
                <div>
                  {guidance === "<p></p>" ? (
                    <Error large>Missing guidance</Error>
                  ) : (
                    <Guidance>
                      <Panel dangerouslySetInnerHTML={{ __html: guidance }} />
                    </Guidance>
                  )}
                </div>
              </Transition>
            )}

            {answers.length ? (
              <Answers>{answers.map(renderAnswer)}</Answers>
            ) : (
              <Error large>
                <IconText icon={IconInfo}>
                  No answers have been added to this question.
                </IconText>
              </Error>
            )}

            {additionalInfo &&
              properties.additionalInfo.enabled && (
                <Transition key="additionalInfo">
                  <div>
                    <Details>
                      <DetailsTitle>
                        {additionalInfo.label || (
                          <Error small>
                            Missing additional information label
                          </Error>
                        )}
                      </DetailsTitle>
                      <DetailsContent>
                        {additionalInfo.content === "<p></p>" ? (
                          <Error large margin={false}>
                            Missing additional information content
                          </Error>
                        ) : (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: additionalInfo.content
                            }}
                          />
                        )}
                      </DetailsContent>
                    </Details>
                  </div>
                </Transition>
              )}
          </TransitionGroup>
        </Container>
      </EditorLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  properties: getProperties(state, ownProps.match.params.pageId),
  questionPage: getQuestionPage(state, ownProps.match.params.pageId)
});

export const QUESTION_PAGE_QUERY = gql`
  query GetQuestionPage($id: ID!) {
    questionPage(id: $id) {
      ...QuestionPage
    }
  }

  ${QuestionPageEditor.fragments.QuestionPage}
`;

const withQuestionPage = flowRight(
  connect(mapStateToProps),
  withApollo
);

export default withQuestionPage(props => (
  <Query
    query={QUESTION_PAGE_QUERY}
    variables={{ id: props.match.params.pageId }}
  >
    {innerProps => {
      return (
        <UnwrappedQuestionPagePreviewRoute
          {...innerProps}
          {...props}
          questionPage={{
            ...get(innerProps.data, "questionPage"),
            ...props.questionPage
          }}
        />
      );
    }}
  </Query>
));
