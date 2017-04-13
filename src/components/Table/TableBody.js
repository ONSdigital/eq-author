import React from 'react'
import styled from 'styled-components'

const TableBody = styled.tbody`
  font-size: 0.8em;
  padding: 1em;
`

export default ({children, ...otherProps}) =>
  <TableBody {...otherProps}>
    {children}
  </TableBody>
