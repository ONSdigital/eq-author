import React from "react";
import { Select } from "components/Forms";

const MetadataSelect = props => (
  <Select {...props}>
    <option value="ru_ref">RU_REF</option>
    <option value="date">DATE</option>
    <option value="name">NAME</option>
  </Select>
);

export default MetadataSelect;
