import React from "react";
import { colorDarkBlue } from "constants/theme";
import styled from "styled-components";

const Sidebar = styled.div`
  background: ${colorDarkBlue};
  width: 100%;
  height: 100%;
  color: white;
`;

export default ({ children }) => (
  <Sidebar>
    {children}
  </Sidebar>
);
