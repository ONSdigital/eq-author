import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";

const StyledTableCol = styled.td`
  padding: 1em;
  &:not(:last-of-type) {
    border-right: 1px solid ${colors.borders};
  }
`;

const TableCol = ({ children, ...otherProps }) => (
  <StyledTableCol {...otherProps}>
    {children}
  </StyledTableCol>
);

TableCol.propTypes = {
  children: PropTypes.node.isRequired
};

export default TableCol;
