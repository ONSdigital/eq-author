import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Field, Input } from "components/Forms";
import SeamlessInput from "./SeamlessInput";
import SeamlessTextArea from "./SeamlessTextArea";

const AnswerInput = ({ answer, onChange, children }) =>
  <div>
    <Field id="answer.title">
      <SeamlessInput
        placeholder="Label"
        size="medium"
        onChange={onChange}
        value={answer.title}
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

AnswerInput.propTypes = {
  children: PropTypes.node,
  answer: CustomPropTypes.answer,
  onChange: PropTypes.func
};

export default AnswerInput;
