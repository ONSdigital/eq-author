import PropTypes from "prop-types";

export default {
  breadcrumb: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  questionnaire: PropTypes.shape({
    description: PropTypes.string,
    legalBasis: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string,
    navigation: PropTypes.bool
  }),
  question: PropTypes.shape({
    type: PropTypes.string.isRequired
  }),
  section: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  }),
  page: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    guidance: PropTypes.string
  })
};
