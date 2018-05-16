import { flowRight } from "lodash";
import { connect } from "react-redux";

import { raiseToast } from "redux/toast/actions";

import QuestionnaireDesignPage from "components/QuestionnaireDesignPage";
import withQuestionnaire from "containers/enhancers/withQuestionnaire";
import withCreatePage from "containers/enhancers/withCreatePage";
import withCreateSection from "containers/enhancers/withCreateSection";
import { getUrlParams } from "utils/UrlUtils";

export const mapStateToProps = (state, { match }) => getUrlParams(match.params);

export default flowRight(
  connect(mapStateToProps, { raiseToast }),
  withQuestionnaire,
  withCreateSection,
  withCreatePage
)(QuestionnaireDesignPage);
