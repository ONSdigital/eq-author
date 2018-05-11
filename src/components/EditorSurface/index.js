/* eslint-disable react/no-find-dom-node */
import React from "react";
import PropTypes from "prop-types";

import { noop, flowRight, isFunction } from "lodash";
import styled from "styled-components";

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
    onUpdatePage: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    onMovePage: PropTypes.func.isRequired,
    onUpdateSection: PropTypes.func.isRequired,
    onDeleteSection: PropTypes.func.isRequired
  };

  state = {
    showDeleteConfirmDialog: false,
    showMovePageDialog: false
  };

  handleOpenMovePageDialog = () => {
    this.setState({ showMovePageDialog: true });
  };

  handleCloseMovePageDialog = cb => {
    this.setState(
      { showMovePageDialog: false },
      isFunction(cb) ? cb : undefined
    );
  };

  handleMovePage = args => {
    this.handleCloseMovePageDialog(() => this.props.onMovePage(args));
  };

  handleOpenDeleteConfirmDialog = cb =>
    this.setState(
      { showDeleteConfirmDialog: true },
      isFunction(cb) ? cb : undefined
    );

  handleCloseDeleteConfirmDialog = cb =>
    this.setState(
      { showDeleteConfirmDialog: false },
      isFunction(cb) ? cb : undefined
    );

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

  render() {
    const {
      section,
      page,
      onUpdatePage,
      onUpdateSection,
      questionnaire
    } = this.props;

    const { showDeleteConfirmDialog, showMovePageDialog } = this.state;

    return (
      <Form onChange={noop} onSubmit={noop}>
        <StyledToolbar>
          <Buttons>
            <Button
              onClick={this.handleOpenMovePageDialog}
              data-test="btn-move"
              variant="tertiary"
              small
              disabled={!page}
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

        <TransitionGroup>
          {page ? (
            <PageTransition key="question-page-editor">
              <div>
                <QuestionPageEditor
                  onUpdatePage={onUpdatePage}
                  page={page}
                  section={section}
                  questionnaire={questionnaire}
                  showDeleteConfirmDialog={showDeleteConfirmDialog}
                  onCloseDeleteConfirmDialog={
                    this.handleCloseDeleteConfirmDialog
                  }
                  showMovePageDialog={showMovePageDialog}
                  onMovePage={this.handleMovePage}
                  onCloseMovePageDialog={this.handleCloseMovePageDialog}
                  onDeletePageConfirm={this.handleDeletePageConfirm}
                  data-test="question-page-editor"
                />
              </div>
            </PageTransition>
          ) : (
            <PageTransition key="section-editor">
              <div>
                <SectionEditor
                  onUpdate={onUpdateSection}
                  section={section}
                  onDeleteSection={this.handleDeleteSection}
                  showDeleteConfirmDialog={showDeleteConfirmDialog}
                  onDeleteSectionConfirm={this.handleDeleteSectionConfirm}
                  onCloseDeleteConfirmDialog={this.handleDeleteSectionConfirm}
                  data-test="section-editor"
                />
              </div>
            </PageTransition>
          )}
        </TransitionGroup>
      </Form>
    );
  }
}

export default flowRight(withMovePage)(UnwrappedEditorSurface);
