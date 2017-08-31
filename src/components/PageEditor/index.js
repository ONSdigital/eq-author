import React from "react";
import Field from "components/Forms/Field";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import PropTypes from "prop-types";

const PageEditor = props =>
  <div>
    <Field id="page.title">
      <SeamlessInput
        size="large"
        placeholder="Question title"
        onChange={props.onChange}
        value={props.pageTitle}
        ref={props.pageTitleRef}
      />
    </Field>
    <Field id="page.description" optional>
      <SeamlessInput
        placeholder="Question text (optional)…"
        value={props.pageDescription}
        onChange={props.onChange}
      />
    </Field>
    <Field id="page.guidance" optional>
      <SeamlessInput
        placeholder="Guidance text (optional)…"
        value={props.pageGuidance}
        onChange={props.onChange}
      />
    </Field>
  </div>;

PageEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  pageTitle: PropTypes.string,
  pageTitleRef: PropTypes.func.isRequired,
  pageDescription: PropTypes.string,
  pageGuidance: PropTypes.string
};

export default PageEditor;
