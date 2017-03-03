import { connect } from 'react-redux'
import QuestionForm from 'components/QuestionForm'
import { changeQuestion, changeAnswer, removeOption, addOption } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    question: state.question
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeQuestion: (value) => dispatch(changeQuestion(value)),
    onChangeAnswer: (index, value) => dispatch(changeAnswer(index, value)),
    onRemoveOption: (answerIndex, optionIndex) => dispatch(removeOption(answerIndex, optionIndex)),
    onAddOption: (answerIndex, option) => dispatch(addOption(answerIndex, option))
  }
}

const QuestionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionForm)

export default QuestionFormContainer
