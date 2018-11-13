import React from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";

import AnswerEditor from "components/AnswerEditor";
import MetaEditor from "./MetaEditor";

import AnswerTransition from "./AnswerTransition";

import AnswerTypeSelector from "components/AnswerTypeSelector";
import getAnswersQuery from "graphql/getAnswers.graphql";
import { TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import getIdForObject from "utils/getIdForObject";

import iconPage from "./icon-dialog-page.svg";

import DeleteConfirmDialog from "components/DeleteConfirmDialog";
import MovePageModal from "components/MovePageModal";
import MovePageQuery from "components/MovePageModal/MovePageQuery";
import gql from "graphql-tag";
import DefinitionEditor from "./DefinitionEditor";

import { Field, Label } from "components/Forms";
import WrappingInput from "components/WrappingInput";
import RichTextEditor from "../RichTextEditor";

const AddAnswerSegment = styled.div`
  padding: 1em 2em 2em;
`;

const QuestionSegment = styled.div`
  padding: 0 2em;
`;

const AnswerSegment = styled.div`
  padding: 1em 2em;
`;

export default class QuestionPageEditor extends React.Component {
  static propTypes = {
    onUpdateAnswer: PropTypes.func.isRequired,
    onUpdatePage: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    onDeleteAnswer: PropTypes.func.isRequired,
    onUpdateOption: PropTypes.func.isRequired,
    onMovePage: PropTypes.func.isRequired,
    showMovePageDialog: PropTypes.bool.isRequired,
    onAddOther: PropTypes.func.isRequired,
    onDeleteOther: PropTypes.func.isRequired,
    onAddExclusive: PropTypes.func.isRequired,
    onDeletePageConfirm: PropTypes.func.isRequired,
    onCloseDeleteConfirmDialog: PropTypes.func.isRequired,
    showDeleteConfirmDialog: PropTypes.bool.isRequired,
    onCloseMovePageDialog: PropTypes.func.isRequired,
    match: CustomPropTypes.match,
    page: CustomPropTypes.page.isRequired
  };

  state = {
    focusOnAdditionalInfo: false
  };

  handleDeleteAnswer = answerId => {
    this.props.onDeleteAnswer(this.props.page.id, answerId);
  };

  renderAnswerEditor = answer => {
    const {
      onUpdateAnswer,
      onAddOption,
      onUpdateOption,
      onDeleteOption,
      onAddOther,
      onAddExclusive,
      onDeleteOther
    } = this.props;

    return (
      <AnswerTransition key={getIdForObject(answer)}>
        <AnswerSegment id={getIdForObject(answer)}>
          <AnswerEditor
            answer={answer}
            onUpdate={onUpdateAnswer}
            onAddOption={onAddOption}
            onAddOther={onAddOther}
            onAddExclusive={onAddExclusive}
            onDeleteOther={onDeleteOther}
            onUpdateOption={onUpdateOption}
            onDeleteOption={onDeleteOption}
            onDeleteAnswer={this.handleDeleteAnswer}
            data-test="answer-editor"
          />
        </AnswerSegment>
      </AnswerTransition>
    );
  };

  renderMovePageModal = ({ loading, error, data }) => {
    const {
      onMovePage,
      showMovePageDialog,
      onCloseMovePageDialog,
      match,
      page
    } = this.props;

    if (loading || error) {
      return null;
    }

    return (
      <MovePageModal
        questionnaire={data.questionnaire}
        isOpen={showMovePageDialog}
        onClose={onCloseMovePageDialog}
        onMovePage={onMovePage}
        sectionId={match.params.sectionId}
        page={page}
      />
    );
  };

  render() {
    const {
      onUpdatePage,
      onAddAnswer,
      showDeleteConfirmDialog,
      onCloseDeleteConfirmDialog,
      onDeletePageConfirm,
      match,
      page,
      client,
      properties
    } = this.props;

    const id = getIdForObject(page);

    const fetchAnswers = ids => {
      return client
        .query({
          query: getAnswersQuery,
          variables: { ids }
        })
        .then(result => result.data.answers);
    };

    return (
      <div data-test="question-page-editor">
        <div>
          <QuestionSegment id={id}>
            <MetaEditor
              onUpdate={onUpdatePage}
              page={page}
              displayDescription={properties.description}
              displayGuidance={properties.guidance}
              displayDefinition={properties.definition}
            />
            <DeleteConfirmDialog
              isOpen={showDeleteConfirmDialog}
              onClose={onCloseDeleteConfirmDialog}
              onDelete={onDeletePageConfirm}
              title={page.displayName}
              alertText="All edits, properties and routing settings will also be removed."
              icon={iconPage}
              data-test="delete-page"
            />
            <MovePageQuery questionnaireId={match.params.questionnaireId}>
              {this.renderMovePageModal}
            </MovePageQuery>
          </QuestionSegment>
          <TransitionGroup>
            {page.answers.map(this.renderAnswerEditor)}
          </TransitionGroup>
        </div>

        <AddAnswerSegment>
          <AnswerTypeSelector
            answerCount={page.answers.length}
            onSelect={onAddAnswer}
            data-test="add-answer"
          />
        </AddAnswerSegment>

        <AddAnswerSegment>
          <TransitionGroup>
            {properties.additionalInfo && (
              <AnswerTransition
                key="additional-info"
                onEntered={node => {
                  node.querySelector("#definition-label").focus();
                }}
              >
                <DefinitionEditor label="Additional information">
                  <Field>
                    <Label htmlFor={"definition-label"}>Label</Label>
                    <WrappingInput
                      id="definition-label"
                      name="label"
                      onChange={() => {}}
                      onBlur={() => {}}
                      value=""
                      bold
                      data-focusable
                    />
                  </Field>
                  <RichTextEditor
                    id="definition-content"
                    label="Content"
                    value=""
                    onUpdate={() => {}}
                    controls={{
                      bold: true,
                      emphasis: true,
                      piping: true
                    }}
                    multiline
                    fetchAnswers={fetchAnswers}
                    metadata={page.section.questionnaire.metadata}
                    testSelector="txt-question-description"
                  />
                </DefinitionEditor>
              </AnswerTransition>
            )}
          </TransitionGroup>
        </AddAnswerSegment>
      </div>
    );
  }
}

QuestionPageEditor.fragments = {
  QuestionPage: gql`
    fragment QuestionPage on QuestionPage {
      ...Page
      displayName
      position
      answers {
        ...AnswerEditor
      }
      section {
        id
        questionnaire {
          id
          metadata {
            id
            displayName
          }
        }
      }
    }

    ${MetaEditor.fragments.Page}
    ${AnswerEditor.fragments.AnswerEditor}
  `
};
