import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";

const StyledLabel = styled.label`
  display: ${props => (props.inline ? "inline-block" : "block")};
  font-size: ${props => (props.small ? "0.75" : "1")}em;
  margin-bottom: ${props => (props.inline ? "0" : "0.4em")};
  font-weight: bold;
  vertical-align: middle;
  color: ${colors.darkGrey};
`;

const Label = ({ htmlFor, children, ...otherProps }) => (
  <StyledLabel htmlFor={htmlFor} {...otherProps}>
    {children}
  </StyledLabel>
);

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
  small: PropTypes.bool
};

Label.defaultProps = {
  small: false
};

export default Label;
