import { connect } from 'react-redux'
import QuestionForm from '../components/QuestionForm'
import { changeQuestion, changeResponse } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    question: state.question,
    responses: state.question.answers
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeQuestion: (value) => dispatch(changeQuestion(value)),
    onChangeResponse: (index, value) => dispatch(changeResponse(index, value))
  }
}

const QuestionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionForm)

export default QuestionFormContainer
