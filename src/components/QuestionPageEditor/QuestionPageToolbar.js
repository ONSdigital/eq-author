import React from "react";
import styled from "styled-components";

import { colors } from "constants/theme";

import IconButtonDelete from "components/IconButtonDelete";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import ModalTrigger from "components/ModalTrigger";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import getTextFromHTML from "utils/getTextFromHTML";

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${colors.borders};
  margin: 0 -1em 1em;
`;

const QuestionPageToolbar = ({ onDeletePage, page }) => (
  <Toolbar>
    <ModalTrigger>
      {({ isOpen, onClose, onOpen }) => (
        <React.Fragment>
          <IconButtonDelete onClick={onOpen} data-test="btn-delete">
            Delete
          </IconButtonDelete>
          <DeleteConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            onDeletePage={onDeletePage}
            title={getTextFromHTML(page.title) || "Untitled page"}
          />
        </React.Fragment>
      )}
    </ModalTrigger>
  </Toolbar>
);

QuestionPageToolbar.propTypes = {
  page: CustomPropTypes.page,
  onDeletePage: PropTypes.func.isRequired
};

export default QuestionPageToolbar;
