import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import DummyDate from "components/Answers/Dummy/Date";

import { Field, Label } from "components/Forms";
import WrappingInput from "components/WrappingInput";
import withEntityEditor from "components/withEntityEditor";
import answerFragment from "graphql/fragments/answer.graphql";
import styled from "styled-components";
import { SimpleSelect } from "../../Forms/Select";
import VisuallyHidden from "../../VisuallyHidden";

const FormatSelect = styled(SimpleSelect.withComponent("div"))`
  padding: 1em 3em 1em 1em;
  width: 66.66%;
  border-radius: 3px;
  opacity: 0.5 !important;
`;

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

const Legend = VisuallyHidden.withComponent("legend");

export const UnwrappedDate = ({
  label,
  name,
  answer,
  onChange,
  onUpdate,
  placeholder
}) => (
  <Fieldset>
    <Legend>Date options</Legend>
    <Field>
      <Label htmlFor={`${name}-${answer.id}`}>{label}</Label>
      <WrappingInput
        id={`${name}-${answer.id}`}
        name={name}
        size="medium"
        onChange={onChange}
        onBlur={onUpdate}
        value={answer.label}
        placeholder={placeholder}
        data-test="date-answer-label"
        data-autofocus
        bold
      />
    </Field>
    <Field>
      <Label>Date format</Label>
      <FormatSelect disabled>
        <DummyDate />
      </FormatSelect>
    </Field>
  </Fieldset>
);

UnwrappedDate.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string
};

UnwrappedDate.defaultProps = {
  label: "Label",
  name: "label"
};

export default withEntityEditor("answer", answerFragment)(UnwrappedDate);
