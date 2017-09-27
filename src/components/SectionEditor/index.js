import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import Field from "components/Forms/Field";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import withEntityEditor from "components/withEntityEditor";
import sectionFragment from "graphql/fragments/section.graphql";

export class StatelessSectionEditor extends React.Component {
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
            ref={this.props.titleRef}
          />
        </Field>
        <Field id="description">
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

StatelessSectionEditor.propTypes = {
  section: CustomPropTypes.section.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  titleRef: PropTypes.func
};

export default withEntityEditor("section", sectionFragment)(
  StatelessSectionEditor
);
