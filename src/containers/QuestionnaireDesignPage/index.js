import { compose } from "react-apollo";
import { connect } from "react-redux";

import QuestionnaireDesign from "./QuestionnaireDesignPage";
import withQuestionnaire from "containers/enhancers/withQuestionnaire";
import withUpdateSection from "containers/enhancers/withUpdateSection";
import withUpdatePage from "containers/enhancers/withUpdatePage";
import { getUrlParams } from "utils/UrlUtils";

export const mapStateToProps = (state, { match }) => getUrlParams(match.params);

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection,
  withUpdatePage
)(QuestionnaireDesign);
