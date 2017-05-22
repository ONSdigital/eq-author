import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Title = styled.div`
  font-size: 1.4em;
  font-weight: 700;
`;

Title.propTypes = {
  children: PropTypes.string.isRequired
};

export default ({ children, ...otherProps }) =>
  <Title {...otherProps}>{children}</Title>;
