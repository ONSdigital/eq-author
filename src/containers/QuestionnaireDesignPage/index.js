import { compose } from "react-apollo";
import { connect } from "react-redux";

import QuestionnaireDesign from "./QuestionnaireDesignPage";
import withQuestionnaire from "../Enhancers/withQuestionnaire";
import withUpdateSection from "../Enhancers/withUpdateSection";
import withUpdatePage from "../Enhancers/withUpdatePage";
import getUrlParams from "../../utils/getUrlParams";

export const mapStateToProps = (state, { match }) => getUrlParams(match.params);

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection,
  withUpdatePage
)(QuestionnaireDesign);
