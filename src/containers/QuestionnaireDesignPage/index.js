import { flowRight } from "lodash";
import { connect } from "react-redux";

import { raiseToast } from "redux/toast/actions";

import QuestionnaireDesignPage from "components/QuestionnaireDesignPage";
import withQuestionnaire from "containers/enhancers/withQuestionnaire";
import withUpdateSection from "containers/enhancers/withUpdateSection";
import withUpdatePage from "containers/enhancers/withUpdatePage";
import withCreatePage from "containers/enhancers/withCreatePage";
import withDeletePage from "containers/enhancers/withDeletePage";
import withCreateSection from "containers/enhancers/withCreateSection";
import withDeleteSection from "containers/enhancers/withDeleteSection";
import { getUrlParams } from "utils/UrlUtils";

export const mapStateToProps = (state, { match }) => getUrlParams(match.params);

export default flowRight(
  connect(mapStateToProps, { raiseToast }),
  withQuestionnaire,
  withUpdateSection,
  withCreateSection,
  withDeleteSection,
  withCreatePage,
  withUpdatePage,
  withDeletePage
)(QuestionnaireDesignPage);
