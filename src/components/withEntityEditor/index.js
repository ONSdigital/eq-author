import React from "react";
import PropTypes from "prop-types";

const withEntityEditor = entityPropName => WrappedComponent => {
  return class EntityEditor extends React.Component {
    static propTypes = {
      [entityPropName]: PropTypes.object.isRequired, // eslint-disable-line
      onUpdate: PropTypes.func.isRequired,
      onSubmit: PropTypes.func
    };

    static displayName = `withEntityEditor(${WrappedComponent.displayName})`;

    constructor(props) {
      super(props);

      this.state = {
        [entityPropName]: props[entityPropName]
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps[entityPropName].id !== this.props[entityPropName].id) {
        this.setState({
          [entityPropName]: nextProps[entityPropName]
        });
      }
    }

    handleChange = ({ name, value }) => {
      this.setState({
        [entityPropName]: {
          ...this.state[entityPropName],
          [name]: value
        }
      });
    };

    handleUpdate = () => {
      this.props.onUpdate(this.state[entityPropName]);
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.onSubmit(this.state[entityPropName]);
    };

    render() {
      const props = { [entityPropName]: this.state[entityPropName] };

      return (
        <WrappedComponent
          {...this.props}
          {...props}
          onChange={this.handleChange}
          onUpdate={this.handleUpdate}
          onSubmit={this.handleSubmit}
        />
      );
    }
  };
};

export default withEntityEditor;
