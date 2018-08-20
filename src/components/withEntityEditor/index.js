import React from "react";
import PropTypes from "prop-types";
import { filter } from "graphql-anywhere";
import { isEmpty, isEqual } from "lodash";
import { startRequest, endRequest } from "../../redux/saving/actions";
import { connect } from "react-redux";

const withSaveTracking = connect(
  null,
  { startRequest, endRequest }
);

const withEntityEditor = (entityPropName, fragment) => WrappedComponent => {
  const entityIsUnset = state => isEmpty(state[entityPropName]);

  class EntityEditor extends React.Component {
    static propTypes = {
      [entityPropName]: PropTypes.object.isRequired, // eslint-disable-line
      onUpdate: PropTypes.func.isRequired,
      onSubmit: PropTypes.func,
      startRequest: PropTypes.func,
      endRequest: PropTypes.func
    };

    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
      if (entityIsUnset(prevState) || !isEqual(nextProps, prevState)) {
        return {
          [entityPropName]: nextProps[entityPropName]
        };
      }
      return null;
    }

    static fragments = WrappedComponent.fragments;

    getEntity() {
      return this.state[entityPropName];
    }

    getFilteredEntity() {
      return filter(fragment, this.getEntity());
    }

    handleChange = ({ name, value }, cb) => {
      const currentEntity = this.getEntity();

      if (currentEntity[name] === value) {
        return;
      }

      const entity = {
        ...currentEntity,
        [name]: value
      };

      this.setState(() => ({ [entityPropName]: entity, isDirty: true }), cb);
    };

    handleUpdate = () => {
      if (!this.state.isDirty) {
        return;
      }

      this.props.startRequest();

      this.props
        .onUpdate(this.getFilteredEntity())
        .then(() => {
          if (!this.unmounted) {
            this.setState(() => ({ isDirty: false }));
          }
          this.props.endRequest();
        })
        .catch(() => {
          this.props.endRequest();
        });
    };

    componentWillUnmount() {
      this.unmounted = true;
    }

    handleSubmit = e => {
      e.preventDefault();

      this.props.onSubmit(this.getFilteredEntity()).then(() => {
        this.setState(() => ({ isDirty: false }));
      });
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
  }

  EntityEditor.displayName = `withEntityEditor(${
    WrappedComponent.displayName
  })`;

  return withSaveTracking(EntityEditor);
};

export default withEntityEditor;
