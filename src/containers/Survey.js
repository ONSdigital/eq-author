import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {loadSurvey} from 'actions/survey';
import SurveyPage from 'pages/Survey';

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, { history }) => ({
  onFileSelected: file => dispatch(loadSurvey(file, history))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SurveyPage)
);
