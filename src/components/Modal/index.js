import React from "react";
import ReactModal from "react-modal";
import styled, { injectGlobal } from "styled-components";
import PropTypes from "prop-types";

const reactModalStyleOverride = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
};

// eslint-disable-next-line no-unused-expressions
injectGlobal`
.ReactModalPortal > div {
    opacity: 0;
}

.ReactModalPortal .ReactModal__Overlay {
  transition: opacity 200ms ease-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &--after-open {
    opacity: 1;
  }

  &--before-close {
      opacity: 0;
  }
}

.ReactModalPortal .ReactModal__Content {
  transform: scale(0.8);
  transform-origin: center center;
  transition: all 100ms ease-in 200ms;
  opacity: 0;

  &--after-open {
    transform: scale(1);
    opacity: 1;
  }

  &--before-close {
    transform: scale(0.8);
    opacity: 0;
  }
}
`;

const StyledModal = styled(ReactModal)`
  position: relative;
`;

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  componentWillMount() {
    ReactModal.setAppElement("body");
  }

  render() {
    const { children, isOpen, onClose } = this.props;
    return (
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick
        style={reactModalStyleOverride}
        closeTimeoutMS={300}
      >
        {children}
      </StyledModal>
    );
  }
}

export default Modal;
