import { flowRight } from "lodash";
import { connect } from "react-redux";

import { raiseToast } from "redux/toast/actions";

import QuestionnaireRouting from "./QuestionnaireRoutingPage";
import { getUrlParams } from "utils/UrlUtils";
import withRouting from "containers/enhancers/withRouting";
import withAvailableRoutingDestinations from "containers/enhancers/withAvailableRoutingDestinations";

export const mapStateToProps = (state, { match }) => getUrlParams(match.params);

export default flowRight(
  connect(mapStateToProps, { raiseToast }),
  withRouting,
  withAvailableRoutingDestinations
)(QuestionnaireRouting);
