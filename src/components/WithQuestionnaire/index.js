import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { merge, set } from "lodash";

const withQuestionnaire = WrappedComponent => {
  return class WithQuestionnaire extends Component {
    static displayName = `WithQuestionnaire(${WrappedComponent.displayName})`;
    static propTypes = {
      loading: PropTypes.bool.isRequired,
      questionnaire: CustomPropTypes.questionnaire,
      onUpdate: PropTypes.func.isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
        questionnaire: { title: "" }
      };
    }

    componentWillReceiveProps({ questionnaire }) {
      this.setState({ questionnaire });
    }

    handleChange = change => {
      const newState = merge(
        {},
        this.state,
        set({}, change.name, change.value)
      );
      this.setState(newState);
    };

    handleBlur = e => this.props.onUpdate(this.state);

    handleSubmit = e => e.preventDefault();

    render() {
      const { loading, questionnaire, ...otherProps } = this.props;

      if (loading) {
        return null;
      }

      return (
        <WrappedComponent
          questionnaire={questionnaire}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onSubmit={this.handleSubmit}
          {...otherProps}
        />
      );
    }
  };
};

export default withQuestionnaire;
