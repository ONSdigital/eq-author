import { connect } from 'react-redux'
import QuestionForm from '../components/QuestionForm'
import { change } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return { question: state.question }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (value) => dispatch(change(value))
  }
}

const QuestionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionForm)

export default QuestionFormContainer
