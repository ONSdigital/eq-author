import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: ${props => (props.inline ? "inline-block" : "block")};
  font-size: 0.9em;
  margin-bottom: ${props => (props.inline ? "0" : "0.4em")};
  font-weight: 700;
  vertical-align: middle;
`;

const Label = ({ id, children, ...otherProps }) =>
  <StyledLabel htmlFor={id} {...otherProps}>
    {children}
  </StyledLabel>;

Label.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string.isRequired
};

export default Label;
