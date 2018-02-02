import { compose } from "react-apollo";
import { withRouter } from "react-router";

import withCreatePage from "containers/enhancers/withCreatePage";
import withDeleteSection from "containers/enhancers/withDeleteSection";
import withUpdateQuestionnaire from "containers/enhancers/withUpdateQuestionnaire";
import withCreateSection from "containers/enhancers/withCreateSection";

import NavigationSidebar from "components/NavigationSidebar";

import { raiseToast } from "redux/toast/actions";
import { connect } from "react-redux";

export default compose(
  connect(null, { raiseToast }),
  withRouter,
  withCreatePage,
  withCreateSection,
  withDeleteSection, // withDeleteSection depends on withCreateSection appearing first.
  withUpdateQuestionnaire
)(NavigationSidebar);
