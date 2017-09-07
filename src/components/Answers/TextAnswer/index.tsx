import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Field, Input } from "components/Forms";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";

const TextAnswer = ({ answer, answerIndex, onChange }) =>
  <div>
    <Field id={`answers[${answerIndex}].label`} last={false}>
      <SeamlessInput
        placeholder="Label"
        size="medium"
        onChange={onChange}
        value={answer.label}
        data-autoFocus
      />
    </Field>
    <Field id={`answers[${answerIndex}].description`} last={false}>
      <SeamlessTextArea
        cols="30"
        rows="5"
        placeholder="Enter a description (optional)…"
        onChange={onChange}
        value={answer.description}
      />
    </Field>
    <Field id="answer.description" last={false}>
      <Input disabled />
    </Field>
  </div>;

export default TextAnswer;
