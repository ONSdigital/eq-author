import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";

const Typeahead = ({ onChange, ...otherProps }) => (
  <Downshift
    itemToString={item => (item ? item.value : "")}
    onChange={selection => onChange(selection.value)}
    {...otherProps}
  />
);

Typeahead.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default Typeahead;
