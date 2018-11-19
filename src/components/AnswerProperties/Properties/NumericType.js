import React from "react";

import { Select } from "components/Forms";
import { units } from "constants/answer-types";
import { map } from "lodash";

/*  eslint-disable react/no-danger */

const NumericType = props => {
  return (
    <Select {...props}>
      {map(units, (unit, unitKey) => (
        <optgroup label={unitKey} key={unitKey}>
          {map(unit.types, (value, key) => (
            <option
              value={`${unitKey}-${key}`}
              key={key}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ))}
        </optgroup>
      ))}
    </Select>
  );
};

export default NumericType;
