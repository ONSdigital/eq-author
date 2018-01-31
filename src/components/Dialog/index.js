import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "constants/theme";
import Button from "components/Button";
import PropTypes from "prop-types";

const StyledDialog = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  position: relative;
  background: ${colors.white};
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  min-width: 25em;
  top: -10em;
`;

const CloseButton = styled(Button)`
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

const keepOpen = e => e.stopPropagation();

class Dialog extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
  };

  render() {
    const { children, onClose, ...otherProps } = this.props;
    return (
      <StyledDialog onClick={keepOpen} {...otherProps}>
        {children}
        <CloseButton clear aria-label="Close" onClick={onClose}>
          &times;
        </CloseButton>
      </StyledDialog>
    );
  }
}

export default Dialog;
