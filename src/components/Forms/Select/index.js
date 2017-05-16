import React from "react";
import styled from "styled-components";
import _ from 'lodash'
import Icon from "./icon.svg";

const Select = styled.select`
  background: white url('${Icon}') no-repeat right 1em center;
`;

export default ({ options, value, id, ...otherProps }) => (
  <Select id={id} name={id} value={value} onChange={e => {}} {...otherProps}>
    {options.map(opt => <option key={opt} value={_.lowerCase(opt)}>{opt}</option>)}
  </Select>
);
