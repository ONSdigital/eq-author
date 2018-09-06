import React from "react";
import { Select } from "components/Forms";

// const NumericOperatorSelect = props => (
//   <Select {...props}>
//     <option value="equal">{"Equal to"}</option>
//     <option value="not-equal">{"Not equal to"}</option>
//     <option value="more">{"More than"}</option>
//     <option value="more-equal">{"More than (inclusive)"}</option>
//     <option value="less">{"Less than"}</option>
//     <option value="less-equal">{"Less than (inclusive)"}</option>
//   </Select>
// );

// const NumericOperatorSelect = props => (
//   <Select {...props}>
//     <option value="equal">{"Equal to"}</option>
//     <option value="not-equal">{"Not equal to"}</option>
//     <option value="more">{"More than"}</option>
//     <option value="more-equal">{"More than (inclusive)"}</option>
//     <option value="less">{"Less than"}</option>
//     <option value="less-equal">{"Less than (inclusive)"}</option>
//   </Select>
// );

const NumericOperatorSelect = props => (
  <Select {...props}>
    <option value="equal">{"(=) Equal to"}</option>
    <option value="not-equal">{"(≠) Not equal to"}</option>
    <option value="more">{"(>) More than"}</option>
    <option value="less">{"(<) Less than"}</option>
    <option value="more-equal">{"(≥) More than or equal to"}</option>
    <option value="less-equal">{"(≤) Less than or equal to"}</option>
  </Select>
);

// const NumericOperatorSelect = props => (
//   <Select {...props}>
//     <option value="more">{"More than"}</option>
//     <option value="more-equal">{"More than or equal to"}</option>
//     <option value="equal">{"Equal to"}</option>
//   </Select>
// );

export default NumericOperatorSelect;
