import React from "react";
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

class QuestionPageToolbar extends React.Component {
  state = {
    isModalOpen: false
  };

  handleModalOpen = () => this.setState({ isModalOpen: true });
  handleModalClose = () => this.setState({ isModalOpen: false });

  render() {
    const { onDeletePage, page } = this.props;

    return (
      <Toolbar>
        <IconButtonDelete onClick={this.handleModalOpen} data-test="btn-delete">
          Delete
        </IconButtonDelete>
        <DeleteConfirmDialog
          isOpen={this.state.isModalOpen}
          onClose={this.handleModalClose}
          onDeletePage={onDeletePage}
          title={getTextFromHTML(page.title) || "Untitled page"}
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
