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
  ${props => !props.iconOnly && separateIconFromText};
  ${props => props.highlightOnHover && highlightOnHover};
`;

class IconButton extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    iconOnly: PropTypes.bool,
    highlightOnHover: PropTypes.bool
  };

  static defaultProps = {
    highlightOnHover: true,
    iconOnly: false
  };

  render() {
    const { icon, title, iconOnly, ...otherProps } = this.props;
    const Text = iconOnly ? <VisuallyHidden>{title}</VisuallyHidden> : title;
    return (
      <Tooltip content={title}>
        <div>
          <StyledButton {...otherProps}>
            <SVG src={icon} uniqueHash={otherProps.uniqueHash} />
            {Text}
          </StyledButton>
        </div>
      </Tooltip>
    );
  }
}

export default IconButton;
