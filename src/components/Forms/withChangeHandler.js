import React from "react";
import PropTypes from "prop-types";

const withChangeHandler = WrappedComponent => {
  return class extends React.Component {
    static propTypes = {
      onChange: PropTypes.func,
      value: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string
    };

    static displayName = `withChangeHandler(${WrappedComponent.displayName})`;

    handleChange = e => {
      const name = this.props.name || this.props.id;
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      this.props.onChange({ name, value });
    };

    render() {
      const { value, ...otherProps } = this.props;
      return (
        <WrappedComponent
          {...otherProps}
          value={value === null ? "" : value}
          onChange={this.handleChange}
        />
      );
    }
  };
};

export default withChangeHandler;
