import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import PropTypes from "prop-types";

const reactModalStyleOverride = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
};

const StyledModal = styled(ReactModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
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
      >
        {children}
      </StyledModal>
    );
  }
}

export default Modal;
