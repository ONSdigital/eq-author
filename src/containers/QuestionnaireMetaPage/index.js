import { compose } from "react-apollo";
import { connect } from "react-redux";

import getUrlParams from "utils/getUrlParams";

import QuestionnaireMeta from "./QuestionnaireMetaPage";
import withQuestionnaire from "../enhancers/withQuestionnaire";
import withUpdateQuestionnaire from "../enhancers/withUpdateQuestionnaire";

export const mapStateToProps = (state, ownProps) =>
  getUrlParams(ownProps.match.params);

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateQuestionnaire
)(QuestionnaireMeta);
