import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AnswerEditor from "components/AnswerEditor";
import MetaEditor from "./MetaEditor";

import AnswerTransition from "./AnswerTransition";
import PageTransition from "components/PageTransition";

import { TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { flowRight } from "lodash";
import CustomPropTypes from "custom-prop-types";
import getIdForObject from "utils/getIdForObject";

import iconPage from "./icon-dialog-page.svg";

import withDeleteAnswer from "containers/enhancers/withDeleteAnswer";
import withUpdateAnswer from "containers/enhancers/withUpdateAnswer";
import withCreateAnswer from "containers/enhancers/withCreateAnswer";
import withCreateOption from "containers/enhancers/withCreateOption";
import withUpdateOption from "containers/enhancers/withUpdateOption";
import withDeleteOption from "containers/enhancers/withDeleteOption";
import withCreateOther from "containers/enhancers/withCreateOther";
import withDeleteOther from "containers/enhancers/withDeleteOther";

import { raiseToast } from "redux/toast/actions";

import DeleteConfirmDialog from "components/DeleteConfirmDialog";
import getTextFromHTML from "utils/getTextFromHTML";
import MovePageModal from "components/MovePageModal";

import focusOnEntity from "utils/focusOnEntity";
import AnswerTypeSelector from "components/AnswerTypeSelector";

const QuestionSegment = styled.div`
  padding: 0 2em;
`;

const AnswerSegment = styled.div`
  padding: 1em 2em;
`;

const AddAnswerSegment = styled.div`
  padding: 1em 2em 2em;
`;

export class QPE extends React.Component {
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
    onDeletePageConfirm: PropTypes.func.isRequired,
    onCloseDeleteConfirmDialog: PropTypes.func.isRequired,
    showDeleteConfirmDialog: PropTypes.bool.isRequired,
    onCloseMovePageDialog: PropTypes.func.isRequired,
    page: CustomPropTypes.page,
    section: CustomPropTypes.section,
    questionnaire: CustomPropTypes.questionnaire
  };

  handleDeleteAnswer = answerId => {
    this.props.onDeleteAnswer(this.props.page.id, answerId);
  };

  handleAddAnswer = answerType => {
    return this.props.onAddAnswer(answerType).then(focusOnEntity);
  };

  renderAnswerEditor = answer => {
    const {
      onUpdateAnswer,
      onAddOption,
      onUpdateOption,
      onDeleteOption,
      onAddOther,
      onDeleteOther
    } = this.props;

    return (
      <AnswerTransition key={getIdForObject(answer)}>
        <AnswerSegment id={getIdForObject(answer)} key={getIdForObject(answer)}>
          <AnswerEditor
            answer={answer}
            onUpdate={onUpdateAnswer}
            onAddOption={onAddOption}
            onAddOther={onAddOther}
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

  render() {
    const {
      page,
      onUpdatePage,
      showDeleteConfirmDialog,
      onCloseDeleteConfirmDialog,
      onDeletePageConfirm,
      section,
      questionnaire
    } = this.props;

    return (
      <div>
        <TransitionGroup>
          <PageTransition key={getIdForObject(page)}>
            <div>
              <QuestionSegment id={getIdForObject(page)}>
                <MetaEditor onUpdate={onUpdatePage} page={page} />
                <DeleteConfirmDialog
                  isOpen={showDeleteConfirmDialog}
                  onClose={onCloseDeleteConfirmDialog}
                  onDelete={onDeletePageConfirm}
                  title={getTextFromHTML(page.title) || "Untitled Page"}
                  alertText="All edits, properties and routing settings will also be removed."
                  icon={iconPage}
                  data-test="delete-page"
                />
                <MovePageModal
                  isOpen={this.props.showMovePageDialog}
                  onClose={this.props.onCloseMovePageDialog}
                  onMovePage={this.props.onMovePage}
                  questionnaire={questionnaire}
                  section={section}
                  page={page}
                />
              </QuestionSegment>

              <TransitionGroup>
                {page.answers.map(this.renderAnswerEditor)}
              </TransitionGroup>
            </div>
          </PageTransition>
        </TransitionGroup>
        <AddAnswerSegment>
          <AnswerTypeSelector
            onSelect={this.handleAddAnswer}
            answers={page.answers}
            data-test="add-answer"
          />
        </AddAnswerSegment>
      </div>
    );
  }
}

export default flowRight(
  connect(null, { raiseToast }),
  withRouter,
  withUpdateAnswer,
  withCreateAnswer,
  withDeleteAnswer,
  withCreateOption,
  withUpdateOption,
  withDeleteOption,
  withCreateOther,
  withDeleteOther
)(QPE);
