import React from 'react'
import styled, { css } from 'styled-components'
import { colorBorders } from 'constants/theme'

const SelectedTabTitle = css`
  background: white;
  border: 1px solid ${colorBorders};
  border-bottom: none;
`

const TabTitle = styled.li`
  padding: 1em 3em;
  cursor: pointer;
  &[aria-selected=true] {
    ${SelectedTabTitle};
  }
`

const TabLabel = styled.div`
  font-size: 0.6em;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 0.05em;
  user-select: none;
`

export default ({children, onClick, selected = true}) =>
  <TabTitle onClick={onClick} aria-selected={selected}>
    <TabLabel>{children}</TabLabel>
  </TabTitle>
