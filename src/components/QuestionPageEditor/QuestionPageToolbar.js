import React, { Component } from "react";
import styled from "styled-components";

import { colors } from "constants/theme";

import IconButtonDelete from "components/IconButtonDelete";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import getTextFromHTML from "utils/getTextFromHTML";

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${colors.borders};
  margin: 0 -1em 1em;
`;

class QuestionPageToolbar extends Component {
  state = {
    showDeleteConfirmDialog: false
  };

  handleOpenDeleteConfirmDialog = () =>
    this.setState({ showDeleteConfirmDialog: true });

  handleCloseDeleteConfirmDialog = () =>
    this.setState({ showDeleteConfirmDialog: false });

  render() {
    return (
      <Toolbar>
        <IconButtonDelete
          onClick={this.handleOpenDeleteConfirmDialog}
          data-test="btn-delete"
        >
          Delete
        </IconButtonDelete>
        <DeleteConfirmDialog
          isOpen={this.state.showDeleteConfirmDialog}
          onClose={this.handleCloseDeleteConfirmDialog}
          onDeletePage={this.props.onDeletePage}
          title={getTextFromHTML(this.props.page.title) || "Untitled page"}
        />
      </Toolbar>
    );
  }
}

QuestionPageToolbar.propTypes = {
  page: CustomPropTypes.page,
  onDeletePage: PropTypes.func.isRequired
};

export default QuestionPageToolbar;
