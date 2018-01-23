import React from "react";
import styled, { css } from "styled-components";
import Button from "components/Button";
import { colors } from "constants/theme";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";
import VisuallyHidden from "../VisuallyHidden";
import SVG from "react-inlinesvg";

const separateIconFromText = css`
  & svg {
    margin-right: 0.6em;
  }
`;

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

const StyledButton = styled(Button).attrs({
  type: "button"
})`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.875em;
  color: ${colors.text};
  ${props => !props.iconOnly && separateIconFromText};
  ${props => props.highlightOnHover && highlightOnHover};

  & svg {
    vertical-align: middle;
  }
`;

const withTooltip = (text, Component) => (
  <Tooltip content={text}>
    <div>{Component}</div>
  </Tooltip>
);

class IconButton extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    iconOnly: PropTypes.bool,
    highlightOnHover: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    highlightOnHover: true,
    iconOnly: false
  };

  render() {
    const { icon, children, iconOnly, ...otherProps } = this.props;
    const text = iconOnly ? (
      <VisuallyHidden>{children}</VisuallyHidden>
    ) : (
      <span>{children}</span>
    );
    const button = (
      <StyledButton iconOnly={iconOnly} {...otherProps}>
        <SVG src={icon} uniqueHash={otherProps.uniqueHash} />
        {text}
      </StyledButton>
    );

    return iconOnly ? withTooltip(children, button) : button;
  }
}

export default IconButton;
