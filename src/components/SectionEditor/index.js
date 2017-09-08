import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import Field from "components/Forms/Field";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import withEntityEditor from "components/withEntityEditor";

class SectionEditor extends React.Component {
  render() {
    const { section, onUpdate, onChange } = this.props;

    return (
      <div id="section-editor">
        <Field id="title">
          <SeamlessInput
            placeholder="Section title"
            size="medium"
            value={section.title}
            onChange={onChange}
            onBlur={onUpdate}
          />
        </Field>
        <Field id="description" optional>
          <SeamlessTextArea
            cols="30"
            rows="5"
            placeholder="Enter a description (optional)…"
            value={section.description}
            onChange={onChange}
            onBlur={onUpdate}
          />
        </Field>
      </div>
    );
  }
}

SectionEditor.propTypes = {
  section: CustomPropTypes.section.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default withEntityEditor("section")(SectionEditor);
