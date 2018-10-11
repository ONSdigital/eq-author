import React from "react";
import styled from "styled-components";

import { Select as BaseSelect } from "components/Forms";

import { map } from "lodash";

const Select = styled(BaseSelect)`
  display: inline-block;
  width: auto;
  margin: 0 0.5em;
  padding: 0.3em 2em 0.3em 0.5em;
`;

const ConditionSelect = ({ id, value, onChange, options }) => {
  return (
    <Select id={id} value={value} onChange={onChange}>
      {map(options, (value, key) => (
        <option value={key} key={key}>
          {value}
        </option>
      ))}
    </Select>
  );
};

ConditionSelect.defaultProps = {
  options: {
    all: "All of",
    any: "Any of",
    none: "Not"
  }
};

export default ConditionSelect;
