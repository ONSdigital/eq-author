import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {loadSurvey} from 'actions/survey';
import SurveyPage from 'pages/Survey';
import readFileAsJSON from "utils/readFileAsJson";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    onFileSelected(e) {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

      readFileAsJSON(file).then(data => {
        dispatch(loadSurvey(data));
        history.push('/create');
      });
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SurveyPage)
);
