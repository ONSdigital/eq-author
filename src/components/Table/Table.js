import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTableWrapper = styled.div`
  border: solid 1px ${props => props.theme.colorBorders};
  border-radius: 2px;
  margin-bottom: 1em;
  overflow: hidden;
`;

const Table = styled.table`
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: -1px;
`;

const TableWrapper = ({children, ...otherProps}) => (
  <StyledTableWrapper {...otherProps}>
    <Table>{children}</Table>
  </StyledTableWrapper>
)

TableWrapper.propTypes = {
  children: PropTypes.object.isRequired
}

export default TableWrapper
