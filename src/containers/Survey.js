import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {loadSurvey} from 'actions/survey';
import SurveyPage from 'pages/Survey';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    onFileSelected: e => {
      const file = e.target.files[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = f => {
          const data = JSON.parse(f.target.result);
          dispatch(loadSurvey(data));
          history.push('/create');
        };
        fileReader.readAsText(file);
      }
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SurveyPage)
);
