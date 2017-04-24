import React from 'react'
import styled from 'styled-components'

const TableWrapper = styled.div`
  border: solid 1px ${props => props.theme.colorBorders};
  border-radius: 2px;
  margin-bottom: 1em;
  overflow: hidden;
`

const Table = styled.table`
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: -1px;
`

export default ({children, ...otherProps}) =>
  <TableWrapper {...otherProps}>
    <Table>{children}</Table>
  </TableWrapper>
