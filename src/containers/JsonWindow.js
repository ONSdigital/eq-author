import { connect } from 'react-redux'
import JsonWindow from '../components/JsonWindow'

const mapStateToProps = (state, ownProps) => {
  return { schema: {
    question: {
      ...state.question,
      answers: state.answers
    },
  } }
}

const JsonWindowContainer = connect(
  mapStateToProps,
)(JsonWindow)

export default JsonWindowContainer
