import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  max-width: 21em;
  margin: auto;
  padding: 0.5em;
`;

const IconGrid = ({ children, "aria-labelledby": labelledby }) => {
  return (
    <Menu role="menu" aria-labelledby={labelledby}>
      {children}
    </Menu>
  );
};

IconGrid.propTypes = {
  children: PropTypes.node.isRequired,
  "aria-labelledby": PropTypes.string
};

export default IconGrid;
