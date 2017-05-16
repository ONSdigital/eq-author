import { connect } from "react-redux";
import CreateSurveyPage from "pages/CreateSurvey";

const mapStateToProps = ({ survey }) => ({
  survey,
  guidance: {
    informationToProvide: survey.blocks.introduction.information_to_provide,
  }
});

export default connect(mapStateToProps)(CreateSurveyPage);
