import { flowRight } from "lodash";
import { withRouter } from "react-router";

import withCreatePage from "containers/enhancers/withCreatePage";
import withDeleteSection from "containers/enhancers/withDeleteSection";
import withCreateSection from "containers/enhancers/withCreateSection";
import withUpdateQuestionnaire from "containers/enhancers/withUpdateQuestionnaire";
import { raiseToast } from "redux/toast/actions";

import NavigationSidebar from "components/NavigationSidebar";
import { connect } from "react-redux";

export default flowRight(
  connect(null, { raiseToast }),
  withRouter,
  withCreatePage,
  withCreateSection,
  withDeleteSection, // withDeleteSection depends on withCreateSection appearing first.
  withUpdateQuestionnaire
)(NavigationSidebar);
