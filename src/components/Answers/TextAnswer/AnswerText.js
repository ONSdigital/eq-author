import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types/index";
import { Field, Input } from "components/Forms/index";
import SeamlessInput from "../../QuestionnaireDesign/SeamlessInput";
import SeamlessTextArea from "../../QuestionnaireDesign/SeamlessTextArea";

const AnswerText = ({ answer, onChange }) =>
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

AnswerText.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AnswerText;
