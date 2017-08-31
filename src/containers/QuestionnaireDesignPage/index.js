import { compose } from "react-apollo";
import { connect } from "react-redux";
import { pick } from "lodash";

import QuestionnaireDesign from "./QuestionnaireDesignPage";
import withQuestionnaire from "../Enhancers/withQuestionnaire";
import withCreateAnswer from "../Enhancers/withCreateAnswer";
import withCreateOption from "../Enhancers/withCreateOption";
import withUpdateSection from "../Enhancers/withUpdateSection";
import withUpdatePage from "../Enhancers/withUpdatePage";
import withUpdateAnswer from "../Enhancers/withUpdateAnswer";
import withUpdateOption from "../Enhancers/withUpdateOption";
import withDeleteOption from "../Enhancers/withDeleteOption";
import withDeleteAnswer from "../Enhancers/withDeleteAnswer";

export const mapStateToProps = (state, { match }) =>
  pick(match.params, ["questionnaireId", "sectionId", "pageId"]);

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection,
  withUpdatePage,
  withCreateAnswer,
  withDeleteAnswer,
  withUpdateAnswer,
  withCreateOption,
  withUpdateOption,
  withDeleteOption
)(QuestionnaireDesign);
