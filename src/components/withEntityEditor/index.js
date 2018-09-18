import React from "react";
import PropTypes from "prop-types";
import { filter } from "graphql-anywhere";
import { isEqual } from "lodash";
import fp from "lodash/fp";
import { startRequest, endRequest } from "../../redux/saving/actions";
import { connect } from "react-redux";

const withSaveTracking = connect(
  null,
  { startRequest, endRequest }
);

const withEntityEditor = (entityPropName, fragment) => WrappedComponent => {
  class EntityEditor extends React.Component {
    static propTypes = {
      [entityPropName]: PropTypes.object.isRequired, // eslint-disable-line
      onUpdate: PropTypes.func.isRequired,
      onSubmit: PropTypes.func,
      startRequest: PropTypes.func,
      endRequest: PropTypes.func
    };

    constructor(props) {
      super(props);
      this.state = {
        [entityPropName]: props[entityPropName]
      };
    }

    componentDidUpdate(prevProps) {
      if (!isEqual(prevProps[entityPropName], this.props[entityPropName])) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          [entityPropName]: this.props[entityPropName]
        });
      }
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

      const entity = fp.set(name, value, currentEntity);
      if (!this.unmounted) {
        this.setState(() => ({ [entityPropName]: entity, isDirty: true }), cb);
      }
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
        if (!this.unmounted) {
          this.setState(() => ({ isDirty: false }));
        }
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
