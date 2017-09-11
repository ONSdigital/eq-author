import { compose } from "react-apollo";
import { connect } from "react-redux";

import getUrlParams from "utils/getUrlParams";

import QuestionnaireMeta from "./QuestionnaireMetaPage";
import withQuestionnaire from "../Enhancers/withQuestionnaire";
import withUpdateQuestionnaire from "../Enhancers/withUpdateQuestionnaire";

export const mapStateToProps = (state, ownProps) =>
  getUrlParams(ownProps.match.params);

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateQuestionnaire
)(QuestionnaireMeta);
