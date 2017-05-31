import React from "react";
import PropTypes from "prop-types";
import { colorDarkBlue } from "constants/theme";
import styled from "styled-components";

const StyledSidebar = styled.div`
  background: ${colorDarkBlue};
  width: 100%;
  height: 100%;
  color: white;
`;

const Sidebar = ({ children }) => (
  <StyledSidebar>
    {children}
  </StyledSidebar>
);

Sidebar.propTypes = {
  children: PropTypes.node
};

export default Sidebar;
