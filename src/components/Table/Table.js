import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";

const StyledTableWrapper = styled.div`
  border: solid 1px ${colors.darkGrey};
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

const TableWrapper = ({ children, ...otherProps }) => (
  <StyledTableWrapper {...otherProps}>
    <Table>{children}</Table>
  </StyledTableWrapper>
);

TableWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default TableWrapper;
