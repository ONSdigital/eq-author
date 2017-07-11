import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { noop } from "lodash";

import Icon from "./icon.svg";
import { colors } from "constants/theme";
import { sharedStyles } from "components/Forms/css";

const StyledSelect = styled.select`
  ${sharedStyles};
  background: white url('${Icon}') no-repeat right 1em center;
  appearance: none;
  &:focus {
    outline: none;
    border: 1px solid ${colors.lightBlue};
  }
`;

const Select = ({ options, defaultValue, id, onChange, ...otherProps }) =>
  <StyledSelect
    id={id}
    name={id}
    defaultValue={defaultValue}
    onChange={function(e) {
      onChange({ [id]: e.target.value });
    }}
    {...otherProps}
  >
    {options.map(opt =>
      <option key={opt} value={opt}>
        {opt}
      </option>
    )}
  </StyledSelect>;

Select.defaultProps = {
  options: [],
  onChange: noop
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func
};

export default Select;
