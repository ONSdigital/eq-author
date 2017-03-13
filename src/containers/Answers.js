import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Answers from 'components/Answers'
import { changeAnswer, removeOption, addOption } from 'actions/answers'

const mapStateToProps = (state) => ({
  answers: state.answers
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeAnswer: bindActionCreators(changeAnswer, dispatch),
    onRemoveOption: bindActionCreators(removeOption, dispatch),
    onAddOption: bindActionCreators(addOption, dispatch),
  }
}

const AnswersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Answers)

export default AnswersContainer
