import React from "react";
import PropTypes from "prop-types";

import Field from "components/Forms/Field";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";

const SectionEditor = props =>
  <div>
    <Field id="section.title">
      <SeamlessInput
        placeholder="Section title"
        size="medium"
        onChange={props.onChange}
        value={props.sectionTitle}
      />
    </Field>
    <Field id="section.description" optional>
      <SeamlessTextArea
        cols="30"
        rows="5"
        placeholder="Enter a description (optional)…"
        onChange={props.onChange}
        value={props.sectionDescription}
      />
    </Field>
  </div>;

SectionEditor.defaultPropTypes = {
  sectionTitle: "",
  sectionDescription: ""
};

SectionEditor.propTypes = {
  sectionTitle: PropTypes.string,
  sectionDescription: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SectionEditor;
