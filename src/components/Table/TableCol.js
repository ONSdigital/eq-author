import React from 'react'
import styled from 'styled-components'

const TableCol = styled.td`
  padding: 1em;
  &:not(:last-of-type) {
    border-right: 1px solid ${props => props.theme.colorBorders};
  }
`

export default ({children, ...otherProps}) =>
  <TableCol {...otherProps}>
    {children}
  </TableCol>
