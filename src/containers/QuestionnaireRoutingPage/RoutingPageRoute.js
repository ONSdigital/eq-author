import React from "react";
import styled from "styled-components";
import { Column, Grid } from "components/Grid";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import RoutingEditor from "./RoutingEditor";
import withRouting from "../enhancers/withRouting";
import EditorLayout from "components/EditorLayout";
import Loading from "components/Loading";

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
      return (
        <Grid>
          <Column cols={10}>
            <Loading height="100%">Loading routing</Loading>
          </Column>
        </Grid>
      );
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
