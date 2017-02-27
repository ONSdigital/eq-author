import { connect } from 'react-redux'
import Question from '../components/Question'
import { change } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return { question: state.question }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (value) => dispatch(change(value))
  }
}

const QuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)

export default QuestionContainer
