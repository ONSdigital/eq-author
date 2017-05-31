import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTableRow = styled.tr`
  font-size: 0.8em;
  padding: 1em;
  display: table-row;
  border-bottom: 1px solid ${props => props.theme.colorBorders};
`;

const TableRow = ({ children, ...otherProps }) => (
  <StyledTableRow {...otherProps}>
    {children}
  </StyledTableRow>
);

TableRow.propTypes = {
  children: PropTypes.node.isRequired
};

export default TableRow;
