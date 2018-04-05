import React from "react";
import PropTypes from "prop-types";
import { filter } from "graphql-anywhere";
import { get, isEmpty } from "lodash";

const withEntityEditor = (entityPropName, fragment) => WrappedComponent => {
  const getEntityId = entity => get(entity, [entityPropName, "id"]);

  return class EntityEditor extends React.Component {
    static propTypes = {
      [entityPropName]: PropTypes.object.isRequired, // eslint-disable-line
      onUpdate: PropTypes.func.isRequired,
      onSubmit: PropTypes.func
    };

    static displayName = `withEntityEditor(${WrappedComponent.displayName})`;

    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        isEmpty(prevState) ||
        getEntityId(prevState) !== getEntityId(nextProps)
      ) {
        return {
          [entityPropName]: nextProps[entityPropName]
        };
      }
      return null;
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
        [entityPropName]: entity
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
