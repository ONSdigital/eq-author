import PropTypes from "prop-types";

const question = PropTypes.shape({
  description: PropTypes.string,
  displayName: PropTypes.string,
  answers: PropTypes.array.isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  guidance: PropTypes.array.isRequired
});

export default question;
