import {connect} from 'react-redux';
import {change} from 'actions/survey';

import DesignSurveyPage from 'pages/DesignSurvey';

const mapStateToProps = (state, ownProps) => {
  const {id, type} = ownProps.match.params;
  const {answers, questions, sections} = state.survey;
  return {
    survey: state.survey,
    selected: answers[id] || questions[id] || sections[id],
    type: type,
  };
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    onChange: e => {
      var value = e.target.value;
      if(e.target.type === "checkbox"){
        value = e.target.checked
      }
      dispatch(change(e.target.name, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(DesignSurveyPage);
