import { flowRight } from "lodash";
import { withRouter } from "react-router";

import withCreateSection from "containers/enhancers/withCreateSection";
import withUpdateQuestionnaire from "containers/enhancers/withUpdateQuestionnaire";

import NavigationSidebar from "components/NavigationSidebar";

export default flowRight(
  withRouter,
  withCreateSection,
  withUpdateQuestionnaire
)(NavigationSidebar);
