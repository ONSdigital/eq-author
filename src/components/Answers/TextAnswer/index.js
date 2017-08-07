import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types/index";
import { Field, Input } from "components/Forms/index";
import SeamlessInput from "../../SeamlessInput/SeamlessInput";
import SeamlessTextArea from "../../SeamlessTextArea/SeamlessTextArea";

const TextAnswer = ({ answer, onChange }) =>
  <div>
    <Field id="answer.label">
      <SeamlessInput
        placeholder="Label"
        size="medium"
        onChange={onChange}
        value={answer.label}
      />
    </Field>
    <Field id="answer.description">
      <SeamlessTextArea
        cols="30"
        rows="5"
        placeholder="Enter a description (optional)…"
        onChange={onChange}
        value={answer.description}
      />
    </Field>
    <Field id="answer.description">
      <Input disabled />
    </Field>
  </div>;

TextAnswer.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TextAnswer;
