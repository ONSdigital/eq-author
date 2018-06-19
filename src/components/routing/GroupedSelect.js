import React from "react";
import PropTypes from "prop-types";
import { isNil } from "lodash";
import Select from "components/Forms/Select";

const GroupedSelect = ({ groups, onChange, value, ...otherProps }) => {
  let optGroups = groups.map(group => (
    <optgroup label={group.label} key={group.id}>
      {group.options.map(option => (
        <option
          value={option.value}
          key={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </optgroup>
  ));

  if (isNil(value)) {
    optGroups.unshift(
      <option disabled value="" key="please-select">
        Please select
      </option>
    );
  }

  return (
    <Select
      onChange={onChange}
      value={isNil(value) ? "" : value}
      {...otherProps}
    >
      {optGroups}
    </Select>
  );
};

const OptionProp = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});

const GroupProp = PropTypes.shape({
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(OptionProp).isRequired
});

GroupedSelect.propTypes = {
  groups: PropTypes.arrayOf(GroupProp).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default GroupedSelect;
