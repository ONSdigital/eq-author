import React from "react";
import PropTypes from "prop-types";

import { Field, Select } from "components/Forms";

const DateFormat = ({ id, value, handleChange }) => (
  <Field>
    <Select value={value} onChange={handleChange} id={id} name={id}>
      <option value="dd/mm/yyyy">dd / Month / yyyy</option>
      <option value="mm/yyyy">Month / yyyy</option>
      <option value="yyyy">yyyy</option>
    </Select>
  </Field>
);

DateFormat.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default DateFormat;
