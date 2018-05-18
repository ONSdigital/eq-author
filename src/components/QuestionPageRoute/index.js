import React from "react";
import styled from "styled-components";
import CustomPropTypes from "custom-prop-types";
import PropTypes from "prop-types";
import { flowRight, isFunction, isNil } from "lodash";
import { Titled } from "react-titled";

import Tabs from "components/Tabs";
import QuestionPageQuery from "./QuestionPageQuery";
import QuestionPageEditor from "components/QuestionPageEditor";
import AnswerTypeSelector from "components/AnswerTypeSelector";
import IconButtonDelete from "components/IconButtonDelete";
import { Toolbar, Buttons } from "components/EditorSurface/Toolbar";
import IconMove from "../EditorSurface/icon-move.svg?inline";
import Button from "components/Button";
import IconText from "components/IconText";

import { connect } from "react-redux";
import { raiseToast } from "redux/toast/actions";
import withUpdatePage from "containers/enhancers/withUpdatePage";
import withUpdateAnswer from "containers/enhancers/withUpdateAnswer";
import withCreateAnswer from "containers/enhancers/withCreateAnswer";
import withDeleteAnswer from "containers/enhancers/withDeleteAnswer";
import withCreateOption from "containers/enhancers/withCreateOption";
import withUpdateOption from "containers/enhancers/withUpdateOption";
import withDeleteOption from "containers/enhancers/withDeleteOption";
import withCreateOther from "containers/enhancers/withCreateOther";
import withDeleteOther from "containers/enhancers/withDeleteOther";
import withMovePage from "containers/enhancers/withMovePage";
import focusOnEntity from "utils/focusOnEntity";
import withDeletePage from "containers/enhancers/withDeletePage";
import getTextFromHTML from "utils/getTextFromHTML";

const AddAnswerSegment = styled.div`
  padding: 1em 2em 2em;
`;

export class UnwrappedQuestionPageRoute extends React.Component {
  static propTypes = {
    match: CustomPropTypes.match,
    onAddAnswer: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    onMovePage: PropTypes.func.isRequired
  };

  state = {
    showDeleteConfirmDialog: false,
    showMovePageDialog: false
  };

  handleOpenMovePageDialog = () => {
    this.setState({ showMovePageDialog: true });
  };

  handleCloseMovePageDialog = cb => {
    this.setState({ showMovePageDialog: false }, isFunction(cb) ? cb : null);
  };

  handleMovePage = args => {
    this.handleCloseMovePageDialog(() => this.props.onMovePage(args));
  };

  handleOpenDeleteConfirmDialog = () =>
    this.setState({ showDeleteConfirmDialog: true });

  handleCloseDeleteConfirmDialog = cb =>
    this.setState(
      { showDeleteConfirmDialog: false },
      isFunction(cb) ? cb : null
    );

  handleDeletePageConfirm = () => {
    const { onDeletePage, match } = this.props;
    const { params: { pageId, sectionId } } = match;

    this.handleCloseDeleteConfirmDialog(() => onDeletePage(sectionId, pageId));
  };

  handleAddAnswer = answerType => {
    const { match, onAddAnswer } = this.props;

    return onAddAnswer(match.params.pageId, answerType).then(focusOnEntity);
  };

  getPageTitle(page) {
    return getTextFromHTML(page.title) || "Untitled page";
  }

  renderPageEditor = ({ loading, error, data }) => {
    if (loading) {
      return "loading";
    }

    if (error || isNil(data.questionPage)) {
      return "Ooops";
    }

    const { showMovePageDialog, showDeleteConfirmDialog } = this.state;

    return (
      <Titled
        title={title => `${this.getPageTitle(data.questionPage)} - ${title}`}
      >
        <QuestionPageEditor
          {...this.props}
          page={data.questionPage}
          showMovePageDialog={showMovePageDialog}
          onCloseMovePageDialog={this.handleCloseMovePageDialog}
          onMovePage={this.handleMovePage}
          showDeleteConfirmDialog={showDeleteConfirmDialog}
          onCloseDeleteConfirmDialog={this.handleCloseDeleteConfirmDialog}
          onDeletePageConfirm={this.handleDeletePageConfirm}
        />
      </Titled>
    );
  };

  render() {
    const { match } = this.props;

    return (
      <Tabs>
        <Toolbar>
          <Buttons>
            <Button
              onClick={this.handleOpenMovePageDialog}
              data-test="btn-move"
              variant="tertiary"
              small
            >
              <IconText icon={IconMove}>Move</IconText>
            </Button>
            <IconButtonDelete
              onClick={this.handleOpenDeleteConfirmDialog}
              data-test="btn-delete"
            >
              Delete
            </IconButtonDelete>
          </Buttons>
        </Toolbar>
        <QuestionPageQuery id={match.params.pageId}>
          {this.renderPageEditor}
        </QuestionPageQuery>
        <AddAnswerSegment>
          <AnswerTypeSelector
            onSelect={this.handleAddAnswer}
            data-test="add-answer"
          />
        </AddAnswerSegment>
      </Tabs>
    );
  }
}

export default flowRight(
  connect(null, { raiseToast }),
  withMovePage,
  withUpdatePage,
  withDeletePage,
  withUpdateAnswer,
  withCreateAnswer,
  withDeleteAnswer,
  withCreateOption,
  withUpdateOption,
  withDeleteOption,
  withCreateOther,
  withDeleteOther
)(UnwrappedQuestionPageRoute);
