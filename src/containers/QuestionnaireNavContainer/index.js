import { compose } from "react-apollo";
import { withRouter } from "react-router";

import withCreatePage from "../enhancers/withCreatePage";
import withDeletePage from "../enhancers/withDeletePage";

import QuestionnaireNav from "components/QuestionnaireNav";
import withCreateSection from "../enhancers/withCreateSection";

export default compose(
  withRouter,
  withCreatePage,
  withDeletePage,
  withCreateSection
)(QuestionnaireNav);
