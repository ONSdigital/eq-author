import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Icon from "./icon-select.svg";
import { colors } from "constants/theme";
import { sharedStyles } from "components/Forms/css";
import withChangeHandler from "components/Forms/withChangeHandler";

const StyledSelect = styled.select`
  ${sharedStyles};
  background: white url('${Icon}') no-repeat right 1em center;
  appearance: none;

  &:focus {
    outline: none;
    border: 1px solid ${colors.lightBlue};
  }
`;

const mapOptions = options =>
  options.map(({ title, id, value, ...otherProps }) => (
    <option key={title} value={value || id || title} id={id} {...otherProps}>
      {title}
    </option>
  ));

const mapOptionGroup = optionGroup =>
  optionGroup.map(({ label, options }) => (
    <optgroup label={label} key={label}>
      {mapOptions(options)}
    </optgroup>
  ));

const Select = ({ options, optionGroup, id, ...otherProps }) => (
  <StyledSelect id={id} name={id} {...otherProps}>
    {options.length > 0 ? mapOptions(options) : mapOptionGroup(optionGroup)}
  </StyledSelect>
);

Select.defaultProps = {
  options: []
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string
    })
  ),
  optionGroup: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      options: PropTypes.array.isRequired
    })
  ),
  defaultValue: PropTypes.string,
  id: PropTypes.string
};

export default withChangeHandler(Select);
