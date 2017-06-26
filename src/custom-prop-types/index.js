import PropTypes from "prop-types";

export default {
  breadcrumb: {
    title: PropTypes.string,
    path: PropTypes.string
  },
  questionnaire: {
    description: PropTypes.string,
    legalBasis: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string,
    navigation: PropTypes.bool
  }
};
