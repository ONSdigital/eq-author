import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";
import IconButtonDelete from "components/IconButtonDelete";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import CustomPropTypes from "custom-prop-types";
import getTextFromHTML from "utils/getTextFromHTML";
import withModal, { ModalPropTypes } from "components/withModal";

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${colors.borders};
  margin: 0 -1em 1em;
`;

export const UnwrappedQuestionPageToolbar = ({
  onDeletePage,
  page,
  onModalOpen,
  isModalOpen,
  onModalClose
}) => (
  <Toolbar>
    <IconButtonDelete onClick={onModalOpen} data-test="btn-delete">
      Delete
    </IconButtonDelete>
    <DeleteConfirmDialog
      isOpen={isModalOpen}
      onClose={onModalClose}
      onDeletePage={onDeletePage}
      title={getTextFromHTML(page.title) || "Untitled page"}
    />
  </Toolbar>
);

UnwrappedQuestionPageToolbar.propTypes = {
  page: CustomPropTypes.page,
  onDeletePage: PropTypes.func.isRequired,
  ...ModalPropTypes
};

export default withModal(UnwrappedQuestionPageToolbar);
