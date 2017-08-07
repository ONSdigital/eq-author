import { compose } from "react-apollo";
import { connect } from "react-redux";
import { pick } from "lodash";

import QuestionnaireDesign from "./QuestionnaireDesignPage";
import withQuestionnaire from "./withQuestionnaire";
import withCreatePage from "./withCreatePage";
import withCreateSection from "./withCreateSection";
import withCreateAnswer from "./withCreateAnswer";
import withCreateOption from "./withCreateOption";
import withUpdateSection from "./withUpdateSection";
import withUpdatePage from "./withUpdatePage";
import withUpdateAnswer from "./withUpdateAnswer";
import withUpdateOption from "./withUpdateOption";
import withDeleteOption from "./withDeleteOption";
import withDeletePage from "./withDeletePage";
import withDeleteAnswer from "./withDeleteAnswer";

export const mapStateToProps = (state, { match }) =>
  pick(match.params, ["questionnaireId", "sectionId", "pageId"]);

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withCreateSection,
  withUpdateSection,
  withCreatePage,
  withUpdatePage,
  withDeletePage, // NOTE: this *must* come after withCreatePage
  withCreateAnswer,
  withDeleteAnswer,
  withUpdateAnswer,
  withCreateOption,
  withUpdateOption,
  withDeleteOption
)(QuestionnaireDesign);
