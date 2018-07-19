import PropTypes from "prop-types";
import * as answerTypes from "constants/answer-types";

const CustomPropTypes = {
  breadcrumb: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  questionnaire: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    legalBasis: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string,
    navigation: PropTypes.bool
  }),
  section: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  }),
  page: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    guidance: PropTypes.string
  }),
  answer: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf(Object.values(answerTypes))
  }),
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    qCode: PropTypes.string,
    value: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      questionnaireId: PropTypes.string.isRequired,
      sectionId: PropTypes.string,
      pageId: PropTypes.string,
      tab: PropTypes.string
    }).isRequired
  }).isRequired,
  questionnaireList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      createdBy: PropTypes.shape({
        name: PropTypes.string
      }).isRequired
    }).isRequired
  ),
  apolloClient: PropTypes.shape({
    query: PropTypes.func.isRequired,
    readQuery: PropTypes.func.isRequired
  }),
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
};

export default CustomPropTypes;
