import React from 'react'
import styled from 'styled-components'

const TableRow = styled.tr`
  font-size: 0.8em;
  padding: 1em;
  display: table-row;
  border-bottom: 1px solid ${props => props.theme.colorBorders};
`

export default ({children, ...otherProps}) =>
  <TableRow {...otherProps}>
    {children}
  </TableRow>
