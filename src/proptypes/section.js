import PropTypes from "prop-types";

export const section = PropTypes.shape({
  description: PropTypes.string,
  displayName: PropTypes.string,
  questions: PropTypes.array.isRequired,
  title: PropTypes.string
});

export default section;
