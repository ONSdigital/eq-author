import React from "react";
import PropTypes from "prop-types";

import { Form, Field, Label, Select } from "components/Forms";

const QuestionProperties = ({ onSubmit, onBlur, onChange, children }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Field id="type">
        <Label>Question type</Label>
        <Select
          options={["General", "DateRange", "RepeatingAnswer", "Relationship"]}
          onChange={onChange}
          onBlur={onBlur}
        />
      </Field>
    </Form>
  );
};

QuestionProperties.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func
};

export default QuestionProperties;
