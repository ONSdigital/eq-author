import { flowRight } from "lodash";
import { connect } from "react-redux";

import { raiseToast } from "redux/toast/actions";

import QuestionnaireRouting from "./QuestionnaireRoutingPage";
import { getUrlParams } from "utils/UrlUtils";
import withRouting from "containers/enhancers/withRouting";

export const mapStateToProps = (state, { match }) => getUrlParams(match.params);

export default flowRight(connect(mapStateToProps, { raiseToast }), withRouting)(
  QuestionnaireRouting
);
