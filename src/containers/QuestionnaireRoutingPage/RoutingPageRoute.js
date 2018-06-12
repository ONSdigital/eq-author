import React from "react";
import styled from "styled-components";
import { Column } from "components/Grid";
import ScrollPane from "components/ScrollPane";
import MainCanvas from "components/MainCanvas";
import SavingIndicator from "components/SavingIndicator";
import Tabs from "components/Tabs";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import RoutingEditor from "./RoutingEditor";
import withRouting from "../enhancers/withRouting";
import EditorLayout from "components/EditorLayout";

import { flowRight } from "lodash";
import { connect } from "react-redux";

import { raiseToast } from "redux/toast/actions";

import withCreateRoutingRuleSet from "containers/enhancers/withCreateRoutingRuleSet";
import withCreateRoutingCondition from "containers/enhancers/withCreateRoutingCondition";
import withDeleteRoutingCondition from "containers/enhancers/withDeleteRoutingCondition";
import withCreateRoutingRule from "../enhancers/withCreateRoutingRule";
import withDeleteRoutingRule from "../enhancers/withDeleteRoutingRule";
import withDeleteRoutingRuleSet from "../enhancers/withDeleteRoutingRuleSet";
import withToggleConditionOption from "../enhancers/withToggleConditionOption";
import withUpdateRoutingCondition from "../enhancers/withUpdateRoutingCondition";
import withUpdateRoutingRule from "../enhancers/withUpdateRoutingRule";
import withUpdateRoutingRuleSet from "../enhancers/withUpdateRoutingRuleSet";

import UnconnectedRoutingEditor from "./UnconnectedRoutingEditor";
import withAvailableRoutingDestinations from "containers/enhancers/withAvailableRoutingDestinations";

const Margin = styled.div`
  margin-top: 2em;
`;

class RoutingPageRoute extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    match: CustomPropTypes.match,
    loading: PropTypes.bool.isRequired
  };

  renderContent() {
    const { questionnaire, section, page, match, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <RoutingEditor
        questionnaire={questionnaire}
        section={section}
        page={page}
        {...this.props}
        match={match}
      />
    );
  }

  render() {
    return <EditorLayout>{this.renderContent()}</EditorLayout>;
  }
}

export default flowRight(
  connect(null, { raiseToast }),
  withRouting,
  withAvailableRoutingDestinations,
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

// export default withRouting(RoutingPageRoute);
