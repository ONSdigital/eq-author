import { compose } from "react-apollo";
import { withRouter } from "react-router";

import withCreatePage from "containers/enhancers/withCreatePage";
import withDeleteSection from "containers/enhancers/withDeleteSection";
import withDeletePage from "containers/enhancers/withDeletePage";

import QuestionnaireNav from "components/QuestionnaireNav";
import withCreateSection from "containers/enhancers/withCreateSection";
import * as ToastActionCreators from "actionCreators/toast";

import { connect } from "react-redux";

export default compose(
  connect(null, ToastActionCreators),
  withRouter,
  withCreatePage,
  withDeletePage,
  withCreateSection,
  withDeleteSection // withDeleteSection depends on withCreateSection appearing first.
)(QuestionnaireNav);
