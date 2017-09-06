import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Field, Input } from "components/Forms";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";

class TextAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: props.answer
    };
  }

  componentWillReceiveProps({ answer }) {
    if (answer.id !== this.props.answer.id) {
      this.setState({ answer });
    }
  }

  handleChange = ({ name, value }) => {
    this.setState({
      answer: {
        ...this.state.answer,
        [name]: value
      }
    });
  };

  handleBlur = e => {
    this.props.onChange(this.state.answer);
  };

  render() {
    const { answer } = this.state;

    return (
      <div>
        <Field id="label">
          <SeamlessInput
            placeholder="Label"
            size="medium"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={answer.label}
            data-autoFocus
          />
        </Field>
        <Field id="description">
          <SeamlessTextArea
            cols="30"
            rows="5"
            placeholder="Enter a description (optional)…"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
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
  onBlur: PropTypes.func.isRequired
};

export default TextAnswer;
