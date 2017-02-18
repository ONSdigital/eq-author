import { connect } from 'react-redux'
import JsonWindow from '../components/JsonWindow'
import { change } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return { question: state.question }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (value) => dispatch(change(value))
  }
}

const JsonWindowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JsonWindow)

export default JsonWindowContainer
