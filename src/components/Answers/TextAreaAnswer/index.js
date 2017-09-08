import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Field, TextArea } from "components/Forms";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";

const TextAreaAnswer = ({ answer, answerIndex, onChange }) =>
  <div>
    <Field id={`answers[${answerIndex}].label`}>
      <SeamlessInput
        placeholder="Label"
        size="medium"
        onChange={onChange}
        value={answer.label}
        data-autoFocus
      />
    </Field>
    <Field id={`answers[${answerIndex}].description`}>
      <SeamlessTextArea
        cols="30"
        rows="5"
        placeholder="Enter a description (optional)…"
        onChange={onChange}
        value={answer.description}
      />
    </Field>
    <div>
      <TextArea rows={5} disabled />
    </div>
  </div>;

TextAreaAnswer.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  answerIndex: PropTypes.number.isRequired
};

export default TextAreaAnswer;
