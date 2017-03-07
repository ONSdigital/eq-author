import { connect } from 'react-redux'
import HTMLPreview from '../components/HTMLPreview'

const mapStateToProps = (state, ownProps) => {
  return { question: state.question }
}

const HTMLPreviewContainer = connect(
  mapStateToProps,
)(HTMLPreview)

export default HTMLPreviewContainer
