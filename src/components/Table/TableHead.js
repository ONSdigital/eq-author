import React from "react";
import styled from "styled-components";

const TableHead = styled.thead`
  font-weight: 700;
  font-size: 0.8em;
  padding: 1em;
`;

export default ({ children, ...otherProps }) =>
  <TableHead {...otherProps}>
    {children}
  </TableHead>;
