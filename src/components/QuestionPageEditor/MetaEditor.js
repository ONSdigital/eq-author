import React from "react";
import { withApollo } from "react-apollo";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";
import { flip, partial, flowRight } from "lodash";

import RichTextEditor from "components/RichTextEditor";
import withEntityEditor from "components/withEntityEditor";
import pageFragment from "graphql/fragments/page.graphql";
import getAnswersQuery from "graphql/getAnswers.graphql";

import { TransitionGroup } from "react-transition-group";
import AnswerTransition from "./AnswerTransition";
import DefinitionEditor from "./DefinitionEditor";

import { Field, Label } from "components/Forms";
import WrappingInput from "components/WrappingInput";

import { colors } from "constants/theme";

const titleControls = {
  emphasis: true,
  piping: true
};

const descriptionControls = {
  bold: true,
  emphasis: true,
  piping: true
};

const guidanceControls = {
  heading: true,
  bold: true,
  list: true,
  piping: true
};

const GuidanceEditor = styled(RichTextEditor)`
  border-left: 5px solid ${colors.borders};
`;

const Paragraph = styled.p`
  margin: 0 0 1em;
  background: ${colors.lighterGrey};
  padding: 0.5em;
  border-left: 5px solid ${colors.lightGrey};
`;

export class StatelessMetaEditor extends React.Component {
  state = {
    displayDescription: false,
    displayGuidance: false
  };

  handleTransitionEnd = node => {
    node.querySelector("label").focus();
  };

  render() {
    const {
      page,
      onChange,
      onUpdate,
      client,
      displayDescription,
      displayGuidance,
      displayDefinition
    } = this.props;

    const handleUpdate = partial(flip(onChange), onUpdate);

    const fetchAnswers = ids => {
      return client
        .query({
          query: getAnswersQuery,
          variables: { ids }
        })
        .then(result => result.data.answers);
    };

    return (
      <div>
        <RichTextEditor
          autoFocus
          id="title"
          label="Question"
          value={page.title}
          onUpdate={handleUpdate}
          controls={titleControls}
          size="large"
          placeholder="What is the title?"
          fetchAnswers={fetchAnswers}
          metadata={page.section.questionnaire.metadata}
          testSelector="txt-question-title"
          placeholder="What is the question?"
        />

        <TransitionGroup>
          {displayDescription && (
            <AnswerTransition
              key="description"
              onEntered={this.handleTransitionEnd}
            >
              <div>
                <RichTextEditor
                  id="description"
                  label="Description"
                  value={page.description}
                  onUpdate={handleUpdate}
                  controls={descriptionControls}
                  multiline
                  fetchAnswers={fetchAnswers}
                  metadata={page.section.questionnaire.metadata}
                  testSelector="txt-question-description"
                />
              </div>
            </AnswerTransition>
          )}

          {displayDefinition && (
            <AnswerTransition
              key="definition"
              onEntered={this.handleTransitionEnd}
            >
              <DefinitionEditor label="Definition">
                <Paragraph>
                  Only to be used to define word(s) or acronym(s) within the
                  question.
                </Paragraph>
                <Field>
                  <Label htmlFor="definition-label">Label</Label>
                  <WrappingInput
                    id={"definition-label"}
                    name="label"
                    onChange={() => {}}
                    onBlur={() => {}}
                    value=""
                    bold
                  />
                </Field>

                <RichTextEditor
                  id="definition-content"
                  label="Content"
                  value=""
                  onUpdate={handleUpdate}
                  controls={descriptionControls}
                  multiline
                  fetchAnswers={fetchAnswers}
                  metadata={page.section.questionnaire.metadata}
                  testSelector="txt-question-description"
                />
              </DefinitionEditor>
            </AnswerTransition>
          )}

          {displayGuidance && (
            <AnswerTransition key="guidance">
              <div>
                <GuidanceEditor
                  id="guidance"
                  label="Include/exclude guidance"
                  value={page.guidance}
                  onUpdate={handleUpdate}
                  controls={guidanceControls}
                  multiline
                  fetchAnswers={fetchAnswers}
                  metadata={page.section.questionnaire.metadata}
                  testSelector="txt-question-guidance"
                />
              </div>
            </AnswerTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

StatelessMetaEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  page: CustomPropTypes.page,
  client: CustomPropTypes.apolloClient.isRequired
};

StatelessMetaEditor.fragments = {
  Page: pageFragment
};

export default flowRight(
  withApollo,
  withEntityEditor("page", pageFragment)
)(StatelessMetaEditor);
