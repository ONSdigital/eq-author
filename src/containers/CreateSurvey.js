import {connect} from 'react-redux';

import CreateSurveyPage from 'pages/CreateSurvey';

const mapStateToProps = (state, ownProps) => {
  return {
    survey: state.survey,
    guidance: {
      informationToProvide: state.survey.blocks.introduction
        .information_to_provide,
    },
  };
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurveyPage);
