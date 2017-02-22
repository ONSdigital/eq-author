import { connect } from 'react-redux'
import JsonWindow from '../components/JsonWindow'

const mapStateToProps = (state, ownProps) => {
  return { question: state.question }
}

const JsonWindowContainer = connect(
  mapStateToProps,
)(JsonWindow)

export default JsonWindowContainer
