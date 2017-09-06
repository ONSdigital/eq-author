import React from "react";
import Field from "components/Forms/Field";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

class MetaEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: props.page
    };
  }

  componentWillReceiveProps({ page }) {
    if (page.id !== this.props.page.id) {
      this.setState({ page });
    }
  }

  handleChange = ({ name, value }) => {
    this.setState({
      page: {
        ...this.state.page,
        [name]: value
      }
    });
  };

  handleBlur = e => {
    this.props.onChange(this.state.page);
  };

  render() {
    const { page } = this.state;

    return (
      <div>
        <Field id="title">
          <SeamlessInput
            size="large"
            placeholder="Question title"
            value={page.title}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </Field>
        <Field id="description" optional>
          <SeamlessInput
            placeholder="Question text (optional)…"
            value={page.description}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </Field>
        <Field id="guidance" optional>
          <SeamlessInput
            placeholder="Guidance text (optional)…"
            value={page.guidance}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </Field>
      </div>
    );
  }
}

MetaEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  page: CustomPropTypes.page
};

export default MetaEditor;
