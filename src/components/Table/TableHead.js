import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";

const StyledTableHead = styled.thead`
  border-bottom: solid 1px ${colors.borders};
  font-weight: 700;
  font-size: 0.8em;
  padding: 1em;
`;

const TableHead = ({ children, ...otherProps }) =>
  <StyledTableHead {...otherProps}>
    {children}
  </StyledTableHead>;

TableHead.propTypes = {
  children: PropTypes.node.isRequired
};

export default TableHead;
