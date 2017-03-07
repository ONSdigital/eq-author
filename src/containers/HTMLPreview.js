import { connect } from 'react-redux'
import HTMLPreview from '../components/HTMLPreview'

const mapStateToProps = (state, ownProps) => {
  return {
    question: state.question,
    answers: state.answers
  }
}

const HTMLPreviewContainer = connect(
  mapStateToProps,
)(HTMLPreview)

export default HTMLPreviewContainer
