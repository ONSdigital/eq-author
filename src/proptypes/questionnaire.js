import PropTypes from "prop-types";

export const questionnaire = {
  items: PropTypes.shape({
    sections: PropTypes.object,
    questions: PropTypes.object,
    answers: PropTypes.object
  }),
  meta: PropTypes.object
};

export default questionnaire;
