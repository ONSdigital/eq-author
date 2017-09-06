import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import Field from "components/Forms/Field";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";

class SectionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      section: props.section
    };
  }

  componentWillReceiveProps({ section }) {
    if (section.id !== this.props.section.id) {
      this.setState({ section });
    }
  }

  handleChange = ({ name, value }) => {
    this.setState({
      section: {
        ...this.state.section,
        [name]: value
      }
    });
  };

  handleBlur = e => {
    this.props.onChange(this.state.section);
  };

  render() {
    const { section } = this.state;

    return (
      <div>
        <Field id="title">
          <SeamlessInput
            placeholder="Section title"
            size="medium"
            onChange={this.handleChange}
            value={section.title}
            onBlur={this.handleBlur}
          />
        </Field>
        <Field id="description" optional>
          <SeamlessTextArea
            cols="30"
            rows="5"
            placeholder="Enter a description (optional)…"
            onChange={this.handleChange}
            value={section.description}
            onBlur={this.handleBlur}
          />
        </Field>
      </div>
    );
  }
}

SectionEditor.propTypes = {
  section: CustomPropTypes.section,
  onChange: PropTypes.func.isRequired
};

export default SectionEditor;
