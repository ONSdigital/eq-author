import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import { Form, Field, Label, TextArea, Input } from "components/Forms";
import styled from "styled-components";
import { colors } from "constants/theme";

const StyledCheckboxInput = styled(Input)`
  border: 2px solid ${colors.borders};
  height: 1.4em;
  width: 1.4em;
  margin-right: 0;
`;
const FlexField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${props => (props.last ? "0" : "1")}em;
`;
const AnswerProperties = props => {
  return (
    <Form onSubmit={props.onSubmit}>
      <FlexField id="answer.required">
        <Label>Required</Label>
        <StyledCheckboxInput type="checkbox" {...props} />
      </FlexField>
      <Field id="answer.validation.message">
        <Label>Custom validation message</Label>
        <TextArea placeholder="Optional" {...props} />
      </Field>
    </Form>
  );
};

AnswerProperties.propTypes = {
  answer: CustomPropTypes.answer,
  children: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func
};

export default AnswerProperties;
