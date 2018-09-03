import React from "react";
import { Select } from "components/Forms";

const NumericSelect = props => (
  <Select {...props}>
    <option value="equal">{"(=) Equal to"}</option>
    <option value="not-equal">{"(≠) Not equal to"}</option>
    <option value="more">{"(>) More than"}</option>
    <option value="less">{"(<) Less than"}</option>
    <option value="more-equal">{"(≥) More than or equal to"}</option>
    <option value="less-equal">{"(≤) Less than or equal to"}</option>
  </Select>
);

export default NumericSelect;
