// import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { radius } from "constants/theme";

const Panel = styled.div`
  border-radius: ${radius};
  padding: 3em;
  background-color: #FFF;
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

Panel.propTypes = {
  children: PropTypes.node.isRequired
};

export default Panel;
