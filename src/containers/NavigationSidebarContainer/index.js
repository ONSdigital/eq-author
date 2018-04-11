import { flowRight } from "lodash";
import { withRouter } from "react-router";

import withCreatePage from "containers/enhancers/withCreatePage";
import withDeleteSection from "containers/enhancers/withDeleteSection";
import withCreateSection from "containers/enhancers/withCreateSection";
import withUpdateQuestionnaire from "containers/enhancers/withUpdateQuestionnaire";
import { raiseToast } from "redux/toast/actions";

import NavigationSidebar from "components/NavigationSidebar";
import { connect } from "react-redux";
import { startRequest } from "redux/saving/actions";

export default flowRight(
  connect(null, { raiseToast, startRequest }),
  withRouter,
  withCreatePage,
  withCreateSection,
  withDeleteSection, // withDeleteSection depends on withCreateSection appearing first.
  withUpdateQuestionnaire
)(NavigationSidebar);
