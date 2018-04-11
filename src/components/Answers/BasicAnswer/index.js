import React from "react";
import { Field } from "components/Forms";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import WrappingInput from "components/WrappingInput";
import withEntityEditor from "components/withEntityEditor";
import answerFragment from "graphql/fragments/answer.graphql";

export const StatelessBasicAnswer = ({
  answer,
  onChange,
  onUpdate,
  children,
  labelPlaceholder,
  descriptionPlaceholder
}) => (
  <div>
    <Field>
      <WrappingInput
        name="label"
        placeholder={labelPlaceholder}
        size="medium"
        onChange={onChange}
        onBlur={onUpdate}
        value={answer.label}
        data-autofocus
        data-test="txt-answer-label"
      />
    </Field>
    <Field>
      <WrappingInput
        name="description"
        cols="30"
        rows="5"
        placeholder={descriptionPlaceholder}
        onChange={onChange}
        onBlur={onUpdate}
        value={answer.description}
        data-test="txt-answer-description"
      />
    </Field>
    {children}
  </div>
);

StatelessBasicAnswer.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  labelPlaceholder: PropTypes.string,
  descriptionPlaceholder: PropTypes.string
};

StatelessBasicAnswer.defaultProps = {
  labelPlaceholder: "Label",
  descriptionPlaceholder: "Enter a description (optional)…"
};

export default withEntityEditor("answer", answerFragment)(StatelessBasicAnswer);
