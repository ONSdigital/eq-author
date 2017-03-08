import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Question from 'components/Question'
import { changeQuestion } from 'actions/question'

const mapStateToProps = (state) => ({
  question: state.question
})

const mapDispatchToProps = (dispatch) => (
  { changeQuestion: bindActionCreators(changeQuestion, dispatch) }
)

const QuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)

export default QuestionContainer
