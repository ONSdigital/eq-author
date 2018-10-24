import React from "react";
import PropTypes from "prop-types";

import { Field, Select } from "components/Forms";
import styled from "styled-components";

const DateField = styled(Field)`
  margin-bottom: 0;
`;

const DateFormat = ({ id, value, onChange }) => (
  <DateField>
    <Select value={value} onChange={onChange} id={id} name={id}>
      <option value="dd/mm/yyyy">dd / Month / yyyy</option>
      <option value="mm/yyyy">Month / yyyy</option>
      <option value="yyyy">yyyy</option>
    </Select>
  </DateField>
);

DateFormat.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DateFormat;
