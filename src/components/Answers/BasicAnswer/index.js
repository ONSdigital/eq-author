import React from "react";
import { Field } from "components/Forms";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import withEntityEditor from "components/withEntityEditor";

const BasicAnswerPropTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export const StatelessBasicAnswer = ({
  answer,
  onChange,
  onUpdate,
  children
}) =>
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
    {children}
  </div>;

StatelessBasicAnswer.propTypes = {
  ...BasicAnswerPropTypes,
  children: PropTypes.element.isRequired
};

export default withEntityEditor("answer")(StatelessBasicAnswer);
