import { connect } from 'react-redux'

import CreateSurveyPage from 'pages/CreateSurvey'

const mapStateToProps = (state, ownProps) => {
  return {
    survey: state.survey
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSurveyPage)
