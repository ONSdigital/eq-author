import React from "react";
import PropTypes from "prop-types";

const withEntityEditor = propName => WrappedComponent => {
  return class EntityEditor extends React.Component {
    static propTypes = {
      [propName]: PropTypes.object.isRequired, // eslint-disable-line
      onUpdate: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired
    };

    static displayName = `withEntityEditor(${WrappedComponent.displayName})`;

    constructor(props) {
      super(props);

      this.state = {
        [propName]: props[propName]
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps[propName].id === this.props[propName].id) {
        this.setState({
          [propName]: nextProps[propName]
        });
      }
    }

    handleChange = ({ name, value }) => {
      this.setState({
        [propName]: {
          ...this.state[propName],
          [name]: value
        }
      });
    };

    handleUpdate = () => {
      this.props.onUpdate(this.state[propName]);
    };

    render() {
      const props = { [propName]: this.state[propName] };

      return (
        <WrappedComponent
          {...this.props}
          {...props}
          onChange={this.handleChange}
          onUpdate={this.handleUpdate}
        />
      );
    }
  };
};

export default withEntityEditor;
