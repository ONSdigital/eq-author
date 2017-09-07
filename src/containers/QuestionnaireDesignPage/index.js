import { compose } from "react-apollo";
import { connect } from "react-redux";
import { pick, parseInt, mapValues } from "lodash";

import QuestionnaireDesign from "./QuestionnaireDesignPage";
import withQuestionnaire from "../Enhancers/withQuestionnaire";
import withUpdateSection from "../Enhancers/withUpdateSection";
import withUpdatePage from "../Enhancers/withUpdatePage";

export const mapStateToProps = (state, { match }) =>
  mapValues(
    pick(match.params, ["questionnaireId", "sectionId", "pageId"]),
    val => parseInt(val)
  );

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection,
  withUpdatePage
)(QuestionnaireDesign);
