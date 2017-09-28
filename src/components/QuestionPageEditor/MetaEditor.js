import React from "react";
import Field from "components/Forms/Field";
import RichTextEditor from "components/RichTextEditor";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import withEntityEditor from "components/withEntityEditor";
import pageFragment from "graphql/fragments/page.graphql";

import { flip, partial } from "lodash";

const titleControls = {
  emphasis: true
};
const descriptionControls = {
  bold: true,
  emphasis: true
};
const guidanceControls = {
  heading: true,
  bold: true,
  emphasis: true,
  list: true
};

export class StatelessMetaEditor extends React.Component {
  render() {
    const { page, onChange, onUpdate } = this.props;
    const handleUpdate = partial(flip(onChange), onUpdate);

    return (
      <div>
        <Field id="title">
          <RichTextEditor
            placeholder="Question title"
            value={page.title}
            ref={this.props.titleRef}
            onUpdate={handleUpdate}
            label="title"
            controls={titleControls}
            size="large"
          />
        </Field>
        <Field id="description">
          <RichTextEditor
            placeholder="Question text (optional)…"
            value={page.description}
            onUpdate={handleUpdate}
            label="guidance"
            controls={descriptionControls}
          />
        </Field>
        <Field id="guidance">
          <RichTextEditor
            placeholder="Guidance text (optional)…"
            value={page.guidance}
            onUpdate={handleUpdate}
            label="guidance"
            controls={guidanceControls}
            multiline
          />
        </Field>
      </div>
    );
  }
}

StatelessMetaEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  page: CustomPropTypes.page,
  titleRef: PropTypes.func
};

export default withEntityEditor("page", pageFragment)(StatelessMetaEditor);
