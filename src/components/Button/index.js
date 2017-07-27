import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { radius, colors } from "constants/theme";
import { darken } from "polished";

const darken10 = darken(0.1);

const ClearButton = css`
  background: transparent;
  border: none;
`;

const PrimaryButton = css`
  background-color: ${colors.blue};
  color: white;
  position: relative;
  border: none;
  &:focus,
  &:hover {
    background-color: ${darken10(colors.blue)}
  }
`;

const SecondaryButton = css`
  background-color: white;
  color: ${colors.text};
  border: 1px ${colors.borders} solid;
  &:focus,
  &:hover {
    background-color: ${colors.borders};
  }
`;

const TertiaryButton = css`
  background-color: ${colors.red};
  color: white;
  position: relative;
  border: none;

  &:focus,
  &:hover {
    background-color: ${darken10(colors.red)}
  }
`;

const StyledButton = styled.button`
  padding: 0.8em 3em;
  border-radius: ${radius};
  font-size: 0.8em;
  font-weight: 400;
  cursor: pointer;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  transition: background-color 200ms ease-out;
  letter-spacing: -0.2px;
  position: relative;
  overflow: hidden;

  &:focus,
  &:active {
    outline: none;
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.6;
  }

  ${props => props.primary && PrimaryButton} ${props =>
      props.secondary && SecondaryButton} ${props =>
      props.tertiary && TertiaryButton} ${props => props.clear && ClearButton};
`;

const Button = ({ children, type, ...otherProps }) =>
  <StyledButton {...otherProps} type={type}>
    {children}
  </StyledButton>;

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
  clear: PropTypes.bool,
  children: PropTypes.node
};

export default Button;
