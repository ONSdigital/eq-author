import React from "react";
import PropTypes from "prop-types";

const Form = ({ action, children, handleSubmit }) =>
  <form action={action} method="POST" onSubmit={handleSubmit}>{children}</form>;

Form.propTypes = {
  action: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Form;
