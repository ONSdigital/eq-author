import React from "react";
import ReactModal from "react-modal";
import styled, { injectGlobal } from "styled-components";
import PropTypes from "prop-types";
import { colors } from "constants/theme";
import Button from "components/Button";

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
  transition: opacity 100ms ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999;

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
  transition: all 100ms ease-in 50ms;
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

const CloseButton = styled(Button).attrs({
  clear: true,
  "aria-label": "Close"
})`
  position: absolute;
  top: 0.25em;
  right: 0.25em;
  font-size: 2em;
  padding: 0.25em 0.5em;
  color: ${colors.lightGrey};
  opacity: 0.7;

  &:hover,
  &:focus {
    opacity: 1;
  }

  &:focus {
    outline: -webkit-focus-ring-color auto 4px;
  }
`;

const StyledModal = styled(ReactModal)`
  display: flex;
  flex-direction: column;
  padding: 2em;
  position: relative;
  background: ${colors.white};
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  min-width: 25em;
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

  componentDidMount() {
    document.addEventListener("hashchange", this.props.onClose);
  }

  componentWillUnmount() {
    document.removeEventListener("hashchange", this.props.onClose);
  }

  render() {
    const { children, isOpen, onClose, ...otherProps } = this.props;
    return (
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick
        style={reactModalStyleOverride}
        closeTimeoutMS={300}
        {...otherProps}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </StyledModal>
    );
  }
}

export default Modal;
