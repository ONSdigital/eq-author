import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTableBody = styled.tbody`
  font-size: 0.8em;
  padding: 1em;
`;

const TableBody = ({children, ...otherProps}) =>
  <StyledTableBody {...otherProps}>
    {children}
  </StyledTableBody>

TableBody.propTypes = {
  children: PropTypes.object.isRequired
}

export default TableBody
