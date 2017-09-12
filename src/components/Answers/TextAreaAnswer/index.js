import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Field, TextArea } from "components/Forms";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import withEntityEditor from "components/withEntityEditor";

export const StatelessTextAreaAnswer = ({ answer, onUpdate, onChange }) =>
  <div>
    <Field id="label">
      <SeamlessInput
        placeholder="Label"
        size="medium"
        onChange={onChange}
        onBlur={onUpdate}
        value={answer.label}
        data-autoFocus
      />
    </Field>
    <Field id="description">
      <SeamlessTextArea
        cols="30"
        rows="5"
        placeholder="Enter a description (optional)…"
        onChange={onChange}
        onBlur={onUpdate}
        value={answer.description}
      />
    </Field>
    <div>
      <TextArea rows={5} disabled id="dummy" />
    </div>
  </div>;

StatelessTextAreaAnswer.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default withEntityEditor("answer")(StatelessTextAreaAnswer);
