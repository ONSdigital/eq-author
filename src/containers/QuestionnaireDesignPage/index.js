import { compose } from "react-apollo";
import { connect } from "react-redux";

import QuestionnaireDesign from "./QuestionnaireDesignPage";
import withQuestionnaire from "../enhancers/withQuestionnaire";
import withUpdateSection from "../enhancers/withUpdateSection";
import withUpdatePage from "../enhancers/withUpdatePage";
import getUrlParams from "../../utils/getUrlParams";

export const mapStateToProps = (state, { match }) => getUrlParams(match.params);

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection,
  withUpdatePage
)(QuestionnaireDesign);
