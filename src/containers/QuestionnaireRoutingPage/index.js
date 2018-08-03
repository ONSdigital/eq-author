import React from "react";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import withRouting from "containers/enhancers/withRouting";
import EditorLayout from "components/EditorLayout";
import Loading from "components/Loading";

import { flowRight } from "lodash";
import { connect } from "react-redux";

import { raiseToast } from "redux/toast/actions";

import withCreateRoutingRuleSet from "containers/enhancers/withCreateRoutingRuleSet";
import withCreateRoutingCondition from "containers/enhancers/withCreateRoutingCondition";
import withDeleteRoutingCondition from "containers/enhancers/withDeleteRoutingCondition";
import withCreateRoutingRule from "containers/enhancers/withCreateRoutingRule";
import withDeleteRoutingRule from "containers/enhancers/withDeleteRoutingRule";
import withDeleteRoutingRuleSet from "containers/enhancers/withDeleteRoutingRuleSet";
import withToggleConditionOption from "containers/enhancers/withToggleConditionOption";
import withUpdateRoutingCondition from "containers/enhancers/withUpdateRoutingCondition";
import withUpdateRoutingRule from "containers/enhancers/withUpdateRoutingRule";
import withUpdateRoutingRuleSet from "containers/enhancers/withUpdateRoutingRuleSet";

import RoutingEditor from "components/routing/RoutingEditor";
import Error from "components/Error";

class RoutingPageRoute extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      questionnaire: CustomPropTypes.questionnaire,
      currentPage: CustomPropTypes.page,
      availableRoutingDestinations: PropTypes.object
    }),
    match: CustomPropTypes.match
  };

  renderContent() {
    const { data, ...otherProps } = this.props;

    if (data.loading) {
      return <Loading height="20em">Loading routing</Loading>;
    }

    if (data.error) {
      return <Error>Something went wrong</Error>;
    }

    return <RoutingEditor {...otherProps} {...data} />;
  }

  render() {
    return <EditorLayout>{this.renderContent()}</EditorLayout>;
  }
}

export default flowRight(
  connect(null, { raiseToast }),
  withRouting,
  withCreateRoutingRuleSet,
  withCreateRoutingCondition,
  withDeleteRoutingCondition,
  withCreateRoutingRule,
  withDeleteRoutingRule,
  withToggleConditionOption,
  withUpdateRoutingCondition,
  withUpdateRoutingRule,
  withUpdateRoutingRuleSet,
  withDeleteRoutingRuleSet
)(RoutingPageRoute);