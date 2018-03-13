import React from "react";
import styled, { css } from "styled-components";

import { colors } from "constants/theme";
import PropTypes from "prop-types";
import Tooltip from "components/Tooltip";
import VisuallyHidden from "components/VisuallyHidden";

const highlightOnHover = css`
  &:hover,
  &:focus {
    color: ${colors.highlight};
  }

  &:hover svg path,
  &:focus svg path {
    fill: ${colors.highlight};
  }
`;

const StyledButton = styled.button.attrs({
  type: "button"
})`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.875em;
  color: inherit;
  padding: 0;
  margin: 0;
  ${props => props.highlightOnHover && highlightOnHover};

  & svg {
    vertical-align: middle;
  }
`;

const Text = styled.span`
  margin-left: 0.6em;
`;

const withTooltip = (text, Component) => (
  <Tooltip content={text}>{Component}</Tooltip>
);

class IconButton extends React.Component {
  static propTypes = {
    icon: PropTypes.func.isRequired,
    iconOnly: PropTypes.bool,
    highlightOnHover: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    highlightOnHover: true,
    iconOnly: false
  };

  render() {
    const { icon: Icon, children, iconOnly, ...otherProps } = this.props;

    const text = iconOnly ? (
      <VisuallyHidden>{children}</VisuallyHidden>
    ) : (
      <Text>{children}</Text>
    );

    const button = (
      <StyledButton iconOnly={iconOnly} {...otherProps}>
        <Icon />
        {text}
      </StyledButton>
    );

    return iconOnly ? withTooltip(children, button) : button;
  }
}

export default IconButton;
