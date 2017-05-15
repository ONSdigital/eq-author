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
        // console.log("value = "+e.target.value);
        // console.log("checked = "+e.target.checked);
        if(e.target.checked === true){
          value = Boolean(true);
        }
        else{
          value = Boolean(false);
        }
      }
      dispatch(change(e.target.name, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(DesignSurveyPage);
