import React from "react";
import PropTypes from "prop-types";

const withValidationHandler = WrappedComponent => {
  return class extends React.Component {
    static propTypes = {
      onChange: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      required: PropTypes.bool
    };

    static displayName = `withValidationHandler(${
      WrappedComponent.displayName
    })`;

    state = {
      valid: true
    };

    handleFocus = e => {
      this.setState({
        valid: true
      });

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    };

    handleUpdate = ({ name, value }) => {
      const div = document.createElement("div");
      div.innerHTML = value;

      if (this.props.onUpdate) {
        this.props.onUpdate({ name, value });
      }

      if (this.props.required) {
        this.setState({
          valid: div.innerText.length > 0 || false
        });
      }
    };

    handleBlur = e => {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }

      if (this.props.required) {
        this.setState({
          valid: e.target.value.length > 0 || false
        });
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onFocus={this.handleFocus}
          onUpdate={this.handleUpdate}
          onBlur={this.handleBlur}
          valid={this.state.valid}
        />
      );
    }
  };
};

export default withValidationHandler;
