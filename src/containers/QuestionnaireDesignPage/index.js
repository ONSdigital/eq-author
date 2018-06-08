import { flowRight } from "lodash";
import { connect } from "react-redux";

import { raiseToast } from "redux/toast/actions";

import QuestionnaireDesignPage from "components/QuestionnaireDesignPage";
import withQuestionnaire from "containers/enhancers/withQuestionnaire";
import withCreatePage from "containers/enhancers/withCreatePage";
import withCreateSection from "containers/enhancers/withCreateSection";

export default flowRight(
  connect(null, { raiseToast }),
  withQuestionnaire,
  withCreateSection,
  withCreatePage
)(QuestionnaireDesignPage);
