import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Icon from "./icon.svg";
import { sharedStyles } from "components/Forms/css";
import withChangeHandler from "components/Forms/withChangeHandler";

const StyledSelect = styled.select`
  ${sharedStyles};
  background: white url('${Icon}') no-repeat right 1em center;
  appearance: none;
`;

const Select = ({ options, defaultValue, id, ...otherProps }) => (
  <StyledSelect id={id} name={id} defaultValue={defaultValue} {...otherProps}>
    {options.map(opt => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </StyledSelect>
);

Select.defaultProps = {
  options: []
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string,
  id: PropTypes.string
};

export default withChangeHandler(Select);
