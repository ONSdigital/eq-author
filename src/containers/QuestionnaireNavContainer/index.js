import { compose } from "react-apollo";
import { withRouter } from "react-router";

import withQuestionnaire from "../Enhancers/withQuestionnaire";
import withCreatePage from "../Enhancers/withCreatePage";
import withDeletePage from "../Enhancers/withDeletePage";

import QuestionnaireNav from "components/QuestionnaireNav";
import withCreateSection from "../Enhancers/withCreateSection";

export default compose(
  withRouter,
  withQuestionnaire,
  withCreatePage,
  withDeletePage,
  withCreateSection
)(QuestionnaireNav);
