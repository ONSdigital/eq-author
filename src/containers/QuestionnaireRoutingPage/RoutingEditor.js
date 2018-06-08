import { flowRight } from "lodash";
import { connect } from "react-redux";

import { raiseToast } from "redux/toast/actions";

import withCreateRoutingRuleSet from "containers/enhancers/withCreateRoutingRuleSet";
import { getUrlParams } from "utils/UrlUtils";
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

export const mapStateToProps = (state, { match }) => getUrlParams(match.params);

export default flowRight(
  connect(mapStateToProps, { raiseToast }),
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
)(UnconnectedRoutingEditor);
