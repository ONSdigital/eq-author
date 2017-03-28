import React from 'react'
import styled, { css } from 'styled-components'
import {radiusGlobal, colorBlue, colorText, colorBorders} from 'constants/theme'
import tinycolor from 'tinycolor2'

const darken = color =>
  tinycolor(color).darken(10).toString()

const ClearButton = css`
  background: transparent;
  border: none;
`

const SmallButton = css`
  font-size: 0.85em;
  padding: 0.5em 1.5em;
`

const PrimaryButton = css`
  background-color: ${colorBlue};
  color: white;
  position: relative;
  border: none;

  &:focus,
  &:hover {
    background-color: ${darken(colorBlue)}
  }
`

const SecondaryButton = css`
  background-color: white;
  color: ${colorText};
  border: 1px ${colorBorders} solid;
  &:focus,
  &:hover {
    background-color: ${colorBorders};
  }
`

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
  ${props => props.clear && ClearButton}
  ${props => props.small && SmallButton}
`

export default (props) =>
  <Button {...props}>{props.children}</Button>
