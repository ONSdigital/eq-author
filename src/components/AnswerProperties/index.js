import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import { Form, Field, Label, TextArea, Input } from "components/Forms";
import styled from "styled-components";
import { colors } from "constants/theme";

const FlexField = styled(Field)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledCheckboxInput = styled(Input)`
  border: 2px solid ${colors.borders};
  height: 1.4em;
  width: 1.4em;
  margin-right: 0;
`;

const AnswerProperties = props => {
  return (
    <Form onSubmit={props.onSubmit}>
      <FlexField id="answer.required">
        <Label small inline>
          Required
        </Label>
        <StyledCheckboxInput type="checkbox" {...props} />
      </FlexField>
      <Field id="answer.validation.message">
        <Label small>Custom validation message</Label>
        <TextArea placeholder="Optional" {...props} />
      </Field>
    </Form>
  );
};

AnswerProperties.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func
};

export default AnswerProperties;
