import PropTypes from "prop-types";

export default {
  breadcrumb: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string
  }),
  questionnaire: PropTypes.shape({
    description: PropTypes.string,
    legalBasis: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string,
    navigation: PropTypes.bool
  })
};
