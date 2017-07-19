import React from "react";
import PropTypes from "prop-types";
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

IconGrid.propTypes = {
  children: PropTypes.node.isRequired
};

export default IconGrid;
