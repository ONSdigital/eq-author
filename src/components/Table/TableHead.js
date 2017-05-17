import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTableHead = styled.thead`
  font-weight: 700;
  font-size: 0.8em;
  padding: 1em;
`;

const TableHead = ({children, ...otherProps}) => (
  <StyledTableHead {...otherProps}>
    {children}
  </StyledTableHead>
)

TableHead.propTypes = {
  children: PropTypes.object.isRequired
}

export default TableHead
