import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";

const TableWrapper = styled.div`
  border: solid 1px ${colors.borders};
  border-radius: 2px;
  margin-bottom: 1em;
  overflow: hidden;
`;

const StyledTable = styled.table`
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: -1px;
`;

const Table = ({ children, ...otherProps }) =>
  <TableWrapper {...otherProps}>
    <StyledTable>{children}</StyledTable>
  </TableWrapper>;

Table.propTypes = {
  children: PropTypes.node.isRequired
};

export default Table;
