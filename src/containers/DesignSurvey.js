import {connect} from 'react-redux';
import DesignSurveyPage from 'pages/DesignSurvey';

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params;
  const {answers, questions, sections} = state.survey;
  return {
    survey: state.survey,
    selected: answers[id] || questions[id] || sections[id],
  };
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignSurveyPage);
