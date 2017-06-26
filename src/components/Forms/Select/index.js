import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "./icon.svg";
import { lowerCase } from "lodash";
import { colors } from "constants/theme";
import { sharedStyles } from "components/Forms/css";

const noop = () => {};

const StyledSelect = styled.select`
  ${sharedStyles};
  background: white url('${Icon}') no-repeat right 1em center;
  appearance: none;
  &:focus {
    outline: none;
    border: 1px solid ${colors.lightBlue};
  }
`;

export const Select = ({
  options,
  defaultValue,
  id,
  handleChange,
  ...otherProps
}) =>
  <StyledSelect
    id={id}
    name={id}
    defaultValue={defaultValue}
    onChange={function(e) {
      handleChange({ [id]: e.target.value });
    }}
    {...otherProps}
  >
    {options.map(opt =>
      <option key={opt} value={lowerCase(opt)}>{opt}</option>
    )}
  </StyledSelect>;

Select.defaultProps = {
  options: [],
  handleChange: noop
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  handleChange: PropTypes.func
};

Select.displayName = "Select";

export default Select;
