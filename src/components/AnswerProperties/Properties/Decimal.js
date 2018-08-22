import React from "react";
import PropTypes from "prop-types";

import { Number } from "components/Forms";

const Decimal = ({ id, value, handleChange }) => (
  <Number
    id={id}
    name={id}
    onChange={handleChange}
    value={value}
    max={6} //System limit enforced by eq-runner
  />
);

Decimal.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Decimal;
