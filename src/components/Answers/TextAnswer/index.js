import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Field, Input } from "components/Forms";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import withEntityEditor from "components/withEntityEditor";

class TextAnswer extends React.Component {
  render() {
    const { answer, onChange, onUpdate } = this.props;

    return (
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
        <Input disabled />
      </div>
    );
  }
}

TextAnswer.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default withEntityEditor("answer")(TextAnswer);
