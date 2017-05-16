import React from "react";
import styled, { css } from "styled-components";
import {
  radiusGlobal,
  colorBlue,
  colorText,
  colorBorders,
  colorRed
} from "constants/theme";
import tinycolor from "tinycolor2";

const darken = color => tinycolor(color).darken(10).toString();

const ClearButton = css`
  background: transparent;
  border: none;
`;

const SmallButton = css`
  font-size: 0.8em;
  padding: 0.5em 1.5em;
`;

const PrimaryButton = css`
  background-color: ${colorBlue};
  color: white;
  position: relative;
  border: none;

  &:focus,
  &:hover {
    background-color: ${darken(colorBlue)}
  }
`;

const SecondaryButton = css`
  background-color: white;
  color: ${colorText};
  border: 1px ${colorBorders} solid;
  &:focus,
  &:hover {
    background-color: ${colorBorders};
  }
`;

const TertiaryButton = css`
background-color: ${colorRed};
color: white;
position: relative;
border: none;

&:focus,
&:hover {
  background-color: ${darken(colorRed)}
}
`;

const Button = styled.button`
  padding: 0.8em 5em;
  border-radius: ${radiusGlobal};
  font-size: 0.9em;
  font-weight: 500;
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
    outline: none
  }

  ${props => props.primary && PrimaryButton}
  ${props => props.secondary && SecondaryButton}
  ${props => props.tertiary && TertiaryButton}
  ${props => props.clear && ClearButton}
  ${props => props.small && SmallButton}
`;

export default props => (
  <Button {...props} className={props.className} type="button">
    {props.children}
  </Button>
);
