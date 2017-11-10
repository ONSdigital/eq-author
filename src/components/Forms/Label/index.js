import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: ${props => (props.inline ? "inline-block" : "block")};
  font-size: ${props => (props.small ? "0.75" : "0.9")}em;
  margin-bottom: ${props => (props.inline ? "0" : "0.4em")};
  font-weight: 700;
  vertical-align: middle;
`;

const Label = ({ id, children, ...otherProps }) => (
  <StyledLabel htmlFor={id} {...otherProps}>
    {children}
  </StyledLabel>
);

Label.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string.isRequired,
  small: PropTypes.bool
};

Label.defaultProps = {
  small: false
};

export default Label;
