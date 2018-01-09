import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "constants/theme";
import Button from "components/Button";
import ButtonGroup from "components/ButtonGroup";
import PropTypes from "prop-types";

const StyledDialog = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  position: relative;
  background: ${colors.white};
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  min-width: 500px;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 3em;
`;

const Action = styled(Button)`
  &:not(:first-child) {
    margin-right: 1em;
  }
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
    onClose: PropTypes.func.isRequired,
    primaryAction: PropTypes.func.isRequired,
    primaryActionText: PropTypes.string.isRequired,
    secondaryAction: PropTypes.func,
    secondaryActionText: PropTypes.string,
    tertiaryAction: PropTypes.func,
    tertiaryActionText: PropTypes.string
  };

  render() {
    const {
      children,
      onClose,
      primaryAction,
      primaryActionText,
      secondaryAction,
      secondaryActionText,
      tertiaryAction,
      tertiaryActionText,
      ...otherProps
    } = this.props;

    return (
      <StyledDialog onClick={keepOpen} {...otherProps}>
        {children}
        <StyledButtonGroup>
          <Action primary onClick={primaryAction} autoFocus>
            {primaryActionText}
          </Action>
          {secondaryAction && (
            <Action secondary onClick={secondaryAction}>
              {secondaryActionText}
            </Action>
          )}
          {tertiaryAction && (
            <Action tertiary onClick={tertiaryAction}>
              {tertiaryActionText}
            </Action>
          )}
        </StyledButtonGroup>
        <CloseButton clear aria-label="Close" onClick={onClose}>
          &times;
        </CloseButton>
      </StyledDialog>
    );
  }
}

export default Dialog;
