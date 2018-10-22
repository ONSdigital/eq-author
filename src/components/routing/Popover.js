import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { colors } from "constants/theme";
import { withScroll } from "../ScrollPane/withScroll";

let lastScrollY = 0;
let ticking = false;

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <ReactModal
    portalClassName={className}
    className={modalClassName}
    {...props}
  />
);

ReactModalAdapter.propTypes = {
  className: ReactModal.propTypes.portalClassName,
  modalClassName: ReactModal.propTypes.className,
  overlayClassName: ReactModal.propTypes.overlayClassName
};

ReactModal.setAppElement("body");

const StyledModal = styled(ReactModalAdapter).attrs({
  overlayClassName: {
    base: "Overlay",
    afterOpen: "Overlay--after-open",
    beforeClose: "Overlay--before-close"
  },
  modalClassName: {
    base: "Modal",
    afterOpen: "Modal--after-open",
    beforeClose: "Modal--before-close"
  }
})`
  .Modal {
    width: 20em;
    background: white;
    border-radius: 4px;
    padding: 1em;
    border: 0 solid #666;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    position: fixed;
    top: ${props => props.top}px;
    left: ${props => props.left}px;

    &--after-open {
      opacity: 1;
    }

    &--before-close {
      opacity: 0;
    }
  }

  .Overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: opacity 100ms ease-out;
    display: flex;
    justify-content: center;
    z-index: 9999999;
    background-color: rgba(0, 0, 0, 0);

    &--after-open {
      opacity: 1;
      align-items: center;
    }

    &--before-close {
      opacity: 0;
    }
  }
`;

class Popover extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    anchorNode: PropTypes.object.isRequired
  };

  static defaultProps = {
    hasCloseButton: true
  };

  componentDidMount() {
    document.addEventListener("hashchange", this.props.onClose, true);
  }

  componentWillUnmount() {
    document.removeEventListener("hashchange", this.props.onClose);
  }

  render() {
    const {
      children,
      isOpen,
      onClose,
      anchorNode,
      scroll,
      ...otherProps
    } = this.props;

    console.log("scroll:" + scroll);

    const { x, y } = anchorNode.getBoundingClientRect();

    return (
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick
        closeTimeoutMS={300}
        shouldFocusAfterRender={false}
        left={x}
        top={y}
        ariaHideApp={false}
        {...otherProps}
      >
        {children}
      </StyledModal>
    );
  }
}

export default withScroll(Popover);
