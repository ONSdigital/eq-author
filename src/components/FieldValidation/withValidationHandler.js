import React from "react";
import PropTypes from "prop-types";

const div = document.createElement("div");

const withValidationHandler = WrappedComponent => {
  return class extends React.Component {
    static propTypes = {
      onChange: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      required: PropTypes.bool,
      id: PropTypes.string.isRequired,
      onValidation: PropTypes.func
    };

    static displayName = `withValidationHandler(${
      WrappedComponent.displayName
    })`;

    state = {
      valid: true
    };

    handleFocus = e => {
      // this.setState({
      //   valid: true
      // });

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    };

    handleUpdate = ({ name, value }) => {
      div.innerHTML = value;

      if (this.props.onUpdate) {
        this.props.onUpdate({ name, value });
      }

      if (this.props.required) {
        const valid = div.innerText.length > 0 || false;

        this.setState({ valid });
        if (this.props.onValidation) {
          this.props.onValidation(this.props.id, valid);
        }
      }
    };

    handleBlur = e => {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }

      if (this.props.required) {
        const valid = e.target.value.length > 0 || false;

        if (this.props.onValidation) {
          this.props.onValidation(this.props.id, valid);
        }
        this.setState({ valid });
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
