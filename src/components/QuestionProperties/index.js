/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import { Form, Field, Label, Select } from "components/Forms";

const QuestionProperties = ({
  question,
  onSubmit,
  onBlur,
  onChange,
  children
}) => {
  if (!question) {
    return null;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Field id="type">
        <Label>Question type</Label>
        <Select
          options={["General", "DateRange", "RepeatingAnswer", "Relationship"]}
          defaultValue={question.type}
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
  onSubmit: PropTypes.func,
  question: CustomPropTypes.question
};

export default QuestionProperties;
