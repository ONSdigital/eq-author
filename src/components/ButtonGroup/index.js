import React from 'react'
import styled, { css } from 'styled-components'

const VerticalGroup = css`
  flex-direction: column;
  *:not(:last-child) {
    margin-bottom: 1.5em;
  }
`

const HorizontalGroup = css`
  flex-direction: row;
  *:not(:last-child) {
    margin-right: 1em;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.vertical && VerticalGroup}
  ${props => props.horizontal &&HorizontalGroup}
`

export default ({children, ...otherProps}) =>
  <ButtonGroup {...otherProps}>{children}</ButtonGroup>
