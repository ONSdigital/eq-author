import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
`;

export const Form = ({ action, children, handleSubmit, ...otherProps }) =>
  <StyledForm
    action={action}
    method="POST"
    onSubmit={handleSubmit}
    {...otherProps}
  >
    {children}
  </StyledForm>;

Form.propTypes = {
  action: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Form;
