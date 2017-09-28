import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import Field from "components/Forms/Field";
import RichTextEditor from "components/RichTextEditor";
import withEntityEditor from "components/withEntityEditor";
import sectionFragment from "graphql/fragments/section.graphql";
import { flip, partial } from "lodash";

const titleControls = {
  emphasis: true
};

const descriptionControls = {
  bold: true,
  emphasis: true
};

export class StatelessSectionEditor extends React.Component {
  render() {
    const { section, onUpdate, onChange } = this.props;
    const handleUpdate = partial(flip(onChange), onUpdate);

    return (
      <div id="section-editor">
        <Field id="title">
          <RichTextEditor
            placeholder="Section title"
            value={section.title}
            ref={this.props.titleRef}
            onUpdate={handleUpdate}
            label="title"
            controls={titleControls}
            size="medium"
          />
        </Field>
        <Field id="description">
          <RichTextEditor
            placeholder="Enter a description (optional)…"
            value={section.description}
            onUpdate={handleUpdate}
            label="description"
            controls={descriptionControls}
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
