import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import styled, { css } from "styled-components";
import { colors } from "constants/theme";
import chevronIcon from "./chevron.svg";

const titleStyles = {
  selected: css`
    background: ${colors.darkBlue};
  `,
  disabled: css`
    background: #ccc;
    pointer-events: none;
  `
};

export const TitleButton = styled(Button)`
  cursor: pointer;
  margin: 0;
  user-select: none;
  position: relative;
  padding: 0.25em 3% 0.25em 6%;
  background: ${colors.blue};
  border-radius: 5px;
  width: 100%;
  height: 2.5em;
  font-size: 1em;
  text-align: left;
  display: inline;

  ${props => (props.disabled ? titleStyles.disabled : null)};
  ${props => (props.selected ? titleStyles.selected : null)};

  &::after {
    content: url(${chevronIcon});
    float: right;
    transform: rotate(270deg);
  }

  &[aria-expanded="false"]::after {
    transform: rotate(-90deg);
    transition: transform 150ms ease-out;
  }

  &[aria-expanded="true"] {
    border-radius: 5px 5px 0 0;
  }
  ::after {
    transform: rotate(0deg);
    transition: transform 150ms ease-in;
  }
`;

class ContentPickerTitle extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    selected: PropTypes.bool,
    disabled: PropTypes.bool
  };

  render() {
    const {
      children,
      onClick,
      disabled,
      selected,
      open,
      ...otherProps
    } = this.props;
    return (
      <TitleButton
        onClick={onClick}
        role="tab"
        aria-expanded={open}
        aria-selected={open}
        disabled={disabled}
        selected={selected}
        {...otherProps}
      >
        {children}
      </TitleButton>
    );
  }
}

export default ContentPickerTitle;
