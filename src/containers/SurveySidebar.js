import {connect} from 'react-redux';
import SurveySidebar from 'components/SurveySidebar';

const mapStateToProps = (state, ownProps) => {
  return {
    sections: state.survey.sections,
    questions: state.survey.questions,
    answers: state.survey.answers,
  };
};

export default connect(mapStateToProps, null, null, {pure: false})(
  SurveySidebar
);
