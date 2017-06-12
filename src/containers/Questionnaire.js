import { connect } from "react-redux";
import { loadQuestionnaire } from "actions/questionnaire";
import QuestionnairePage from "pages/Questionnaire";

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = { onFileSelected: loadQuestionnaire };

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnairePage);
