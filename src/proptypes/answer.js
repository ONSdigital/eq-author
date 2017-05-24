/* eslint-disable camelcase */

import PropTypes from "prop-types";

export const answer = PropTypes.shape({
  description: PropTypes.string,
  displayName: PropTypes.string,
  mandatory: PropTypes.bool.isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  q_code: PropTypes.string.isRequired
});

export default answer;
