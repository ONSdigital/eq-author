import React from "react";

const Form = ({ action, children, handleSubmit }) =>
  <form action={action} method="POST" onSubmit={handleSubmit}>{children}</form>;

Form.propTypes = {};

export default Form;
