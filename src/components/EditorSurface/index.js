import React from "react";
import PropTypes from "prop-types";

import { noop, flowRight, isFunction } from "lodash";
import styled from "styled-components";
import { Switch } from "react-router-dom";
import { Route } from "react-router";

import { TransitionGroup } from "react-transition-group";
import PageTransition from "components/PageTransition";
import Form from "components/Forms/Form";
import CustomPropTypes from "custom-prop-types";

import SectionEditor from "components/SectionEditor";
import QuestionPageEditor from "components/QuestionPageEditor";

import IconMove from "./icon-move.svg?inline";
import Button from "components/Button";
import IconText from "components/IconText";

import withMovePage from "containers/enhancers/withMovePage";

import IconButtonDelete from "components/IconButtonDelete";
import { Toolbar, Buttons } from "components/EditorSurface/Toolbar";

const StyledToolbar = styled(Toolbar)`
  margin: 1em 1em 0;
`;

export class UnwrappedEditorSurface extends React.Component {
  static propTypes = {
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    questionnaire: CustomPropTypes.questionnaire,
    onDelete: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired
    // onUpdatePage: PropTypes.func.isRequired,
    // onDeletePage: PropTypes.func.isRequired,
    // onMovePage: PropTypes.func.isRequired,
    // onUpdateSection: PropTypes.func.isRequired,
    // onDeleteSection: PropTypes.func.isRequired
  };

  state = {
    showDeleteConfirmDialog: false,
    showMovePageDialog: false
  };

  handleOpenMovePageDialog = () => {
    this.setState({ showMovePageDialog: true });
  };

  handleCloseMovePageDialog = (cb = noop) => {
    this.setState({ showMovePageDialog: false }, cb);
  };

  handleMovePage = args => {
    this.handleCloseMovePageDialog(() => this.props.onMovePage(args));
  };

  handleOpenDeleteConfirmDialog = (cb = noop) =>
    this.setState({ showDeleteConfirmDialog: true }, cb);

  handleCloseDeleteConfirmDialog = (cb = noop) =>
    this.setState({ showDeleteConfirmDialog: false }, cb);

  handleDeletePageConfirm = () => {
    const { onDeletePage, section, page } = this.props;

    this.handleCloseDeleteConfirmDialog(() =>
      onDeletePage(section.id, page.id)
    );
  };

  handleDeleteSectionConfirm = () => {
    const { onDeleteSection, section } = this.props;
    this.handleCloseDeleteConfirmDialog(() => onDeleteSection(section.id));
  };

  renderQuestionPageEditor = props => {
    const { section, page, onUpdatePage, questionnaire } = this.props;

    const { showDeleteConfirmDialog, showMovePageDialog } = this.state;

    return (
      <QuestionPageEditor
        {...props}
        onUpdatePage={onUpdatePage}
        page={page}
        section={section}
        questionnaire={questionnaire}
        showDeleteConfirmDialog={showDeleteConfirmDialog}
        onCloseDeleteConfirmDialog={this.handleCloseDeleteConfirmDialog}
        showMovePageDialog={showMovePageDialog}
        onMovePage={this.handleMovePage}
        onCloseMovePageDialog={this.handleCloseMovePageDialog}
        onDeletePageConfirm={this.handleDeletePageConfirm}
        data-test="question-page-editor"
      />
    );
  };

  renderSectionEditor = props => {
    const { section, onUpdateSection } = this.props;
    const { showDeleteConfirmDialog } = this.state;

    return (
      <SectionEditor
        {...props}
        onUpdate={onUpdateSection}
        section={section}
        onDeleteSection={this.handleDeleteSection}
        showDeleteConfirmDialog={showDeleteConfirmDialog}
        onDeleteSectionConfirm={this.handleDeleteSectionConfirm}
        onCloseDeleteConfirmDialog={this.handleDeleteSectionConfirm}
        data-test="section-editor"
      />
    );
  };

  render() {
    return (
      <Form onChange={noop} onSubmit={noop}>
        <StyledToolbar>
          <Buttons>
            <Button
              onClick={this.handleOpenMovePageDialog}
              data-test="btn-move"
              variant="tertiary"
              small
              disabled={!this.props.page}
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
        </StyledToolbar>

        {this.props.children}
      </Form>
    );
  }
}

export default flowRight(withMovePage)(UnwrappedEditorSurface);
