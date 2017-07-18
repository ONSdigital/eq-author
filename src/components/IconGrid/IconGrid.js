import React from "react";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const IconGrid = ({ children }) => {
  return (
    <Menu role="menu">
      {children}
    </Menu>
  );
};

export default IconGrid;
