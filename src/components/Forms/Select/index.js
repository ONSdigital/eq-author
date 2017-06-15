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

export const Select = ({ options, value, id, ...otherProps }) =>
  <StyledSelect id={id} name={id} value={value} onChange={noop} {...otherProps}>
    {options.map(opt =>
      <option key={opt} value={lowerCase(opt)}>{opt}</option>
    )}
  </StyledSelect>;

Select.defaultProps = {
  options: []
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string.isRequired,
  id: PropTypes.string
};

Select.displayName = "Select";

export default Select;
