import React from "react";
import Field from "components/Forms/Field";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import withEntityEditor from "components/withEntityEditor";

class MetaEditor extends React.Component {
  render() {
    const { page, onChange, onUpdate } = this.props;

    return (
      <div>
        <Field id="title">
          <SeamlessInput
            size="large"
            placeholder="Question title"
            value={page.title}
            onChange={onChange}
            onBlur={onUpdate}
          />
        </Field>
        <Field id="description" optional>
          <SeamlessInput
            placeholder="Question text (optional)…"
            value={page.description}
            onChange={onChange}
            onBlur={onUpdate}
          />
        </Field>
        <Field id="guidance" optional>
          <SeamlessInput
            placeholder="Guidance text (optional)…"
            value={page.guidance}
            onChange={onChange}
            onBlur={onUpdate}
          />
        </Field>
      </div>
    );
  }
}

MetaEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  page: CustomPropTypes.page
};

export default withEntityEditor("page")(MetaEditor);
