import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Icon from "./icon.svg";
import { lowerCase } from "lodash";

const noop = () => {};

const Select = styled.select`
  background: white url('${Icon}') no-repeat right 1em center;
`;

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange : PropTypes.func
};

Select.defaultProps = {
  options: []
};

export default ({ options, value, id, ...otherProps }) => (
  <Select
    id={id}
    name={id}
    value={value}
    onChange={noop}
    {...otherProps}
  >
    {options.map(opt => <option key={opt} value={lowerCase(opt)}>{opt}</option>)}
  </Select>
);
