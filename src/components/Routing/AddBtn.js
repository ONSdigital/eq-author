import React from "react";
import styled from "styled-components";

import TextBtn from "./TextBtn";
import iconAdd from "./icon-add.svg";

const IconBtn = styled(TextBtn)`
  &::before {
    content: "";
    background: url(${iconAdd}) no-repeat center;
    background-size: 100%;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin-right: 0.3em;
    width: 1.2em;
    height: 1.2em;
  }
`;

const IconLabel = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const AddBtn = ({ children, ...otherProps }) => (
  <IconBtn {...otherProps}>
    <IconLabel>{children}</IconLabel>
  </IconBtn>
);

export default AddBtn;
