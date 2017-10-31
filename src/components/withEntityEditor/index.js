import React from "react";
import PropTypes from "prop-types";
import { filter } from "graphql-anywhere";
import getIdForObject from "utils/getIdForObject";

const withEntityEditor = (entityPropName, fragment) => WrappedComponent => {
  return class EntityEditor extends React.Component {
    static propTypes = {
      [entityPropName]: PropTypes.object.isRequired, // eslint-disable-line
      onUpdate: PropTypes.func.isRequired,
      onSubmit: PropTypes.func
    };

    static displayName = `withEntityEditor(${WrappedComponent.displayName})`;

    constructor(props) {
      super(props);

      const entity = props[entityPropName];

      this.state = {
        [entityPropName]: entity
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps[entityPropName].id !== this.props[entityPropName].id) {
        this.setState({
          [entityPropName]: nextProps[entityPropName]
        });
      }
    }

    getEntity() {
      return this.state[entityPropName];
    }

    getFilteredEntity() {
      return filter(fragment, this.getEntity());
    }

    handleChange = ({ name, value }, cb) => {
      const entity = {
        ...this.getEntity(),
        [name]: value
      };

      this.setState({ [entityPropName]: entity }, cb);
    };

    handleUpdate = () => {
      this.props.onUpdate(this.getFilteredEntity());
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.onSubmit(this.getFilteredEntity());
    };

    render() {
      const entity = this.getEntity();
      const props = {
        [entityPropName]: entity,
        id: getIdForObject(entity)
      };

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
