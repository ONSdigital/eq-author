import React from "react";
import Modal from "components/Modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AnswerContentPicker } from "components/ContentPicker";
import { colors } from "constants/theme";

const HeaderSegment = styled.div`
  color: ${colors.darkGrey};
  font-weight: bold;
  font-size: 1.25em;
  margin: 1em 0 2em 1em;
`;

const ContentPickerModal = ({ isOpen, onClose, onSubmit, data }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <HeaderSegment>Select a previous answer</HeaderSegment>
    <AnswerContentPicker data={data} onSubmit={onSubmit} onClose={onClose} />
  </Modal>
);

ContentPickerModal.propTypes = {
  data: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onSubmit: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default ContentPickerModal;
