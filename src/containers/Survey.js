import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {loadSurvey} from 'actions/survey';
import SurveyPage from 'pages/Survey';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, { history }) => ({
  onFileSelected: e => dispatch(loadSurvey(e.target.files[0], history))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SurveyPage)
);
