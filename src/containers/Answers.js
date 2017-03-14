import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Answers from 'components/Answers'
import { changeAnswer, changeAnswerOptions } from 'actions/answers'

const mapStateToProps = (state) => ({
  answers: state.answers
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeAnswer: bindActionCreators(changeAnswer, dispatch),
    onChangeAnswerOptions: bindActionCreators(changeAnswerOptions, dispatch),
  }
}

const AnswersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Answers)

export default AnswersContainer
