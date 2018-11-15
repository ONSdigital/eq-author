import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Heading } from "components/Dialog/DialogMessage";
import ModalFullScreen from "components/ModalFullScreen";
import Anatomy from "./anatomy.svg?inline";

import { colors } from "constants/theme";

const StyledAnatomy = styled(Anatomy)`
  width: 80em;
  height: auto;
  margin: 1em auto;
`;

const CenteredHeading = styled(Heading)`
  text-align: center;
  margin: 2em 0 5em;
  color: ${colors.darkGrey};
`;

const Content = styled.div`
  height: 100%;
  padding: 1em 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const StyledModal = styled(ModalFullScreen)`
  .Modal {
    background: ${colors.white};
    transform: scale(1);
    transform-origin: center center;
    transition: all 50ms ease-in 50ms;
    opacity: 0;

    &--after-open {
      transform: scale(1);
      opacity: 1;
    }

    &--before-close {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

export class UnwrappedMetadataModal extends Component {
  render() {
    const { isOpen, onClose } = this.props;

    return (
      <StyledModal isOpen={isOpen} onClose={onClose}>
        <Content>
          <StyledAnatomy />
        </Content>
      </StyledModal>
    );
  }
}

UnwrappedMetadataModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default UnwrappedMetadataModal;
