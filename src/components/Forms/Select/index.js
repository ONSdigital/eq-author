import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "./icon.svg";
import { lowerCase } from "lodash";

const noop = () => {};

const StyledSelect = styled.select`
  background: white url('${Icon}') no-repeat right 1em center;
`;

const Select = ({ options, value, id, ...otherProps }) => (
  <StyledSelect id={id} name={id} value={value} onChange={noop} {...otherProps}>
    {options.map(opt => (
      <option key={opt} value={lowerCase(opt)}>{opt}</option>
    ))}
  </StyledSelect>
);

Select.defaultProps = {
  options: []
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  id: PropTypes.string,
  noop: PropTypes.func
};

export default Select;
