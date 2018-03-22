import React, { Component } from "react";

import IconButtonDelete from "components/IconButtonDelete";
import { Toolbar, Buttons } from "components/EditorSurface/Toolbar";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import getTextFromHTML from "utils/getTextFromHTML";

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
        {this.props.children}
        <Buttons>
          <IconButtonDelete
            onClick={this.handleOpenDeleteConfirmDialog}
            data-test="btn-delete"
          >
            Delete
          </IconButtonDelete>
        </Buttons>
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
  onDeletePage: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default QuestionPageToolbar;
