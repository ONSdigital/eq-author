import { connect } from "react-redux";
import { loadSurvey } from "actions/survey";
import SurveyPage from "pages/Survey";

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = { onFileSelected: loadSurvey };

export default connect(mapStateToProps, mapDispatchToProps)(SurveyPage);
