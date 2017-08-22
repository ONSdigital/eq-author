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
  }),
  answer: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  }),
  option: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    qCode: PropTypes.string,
    value: PropTypes.string
  })
};
