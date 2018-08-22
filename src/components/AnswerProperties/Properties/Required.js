import React from "react";
import PropTypes from "prop-types";

import ToggleSwitch from "components/ToggleSwitch";

const Required = ({ id, value, handleChange }) => (
  <ToggleSwitch id={id} name={id} onChange={handleChange} checked={value} />
);

Required.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Required;
