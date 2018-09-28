import React from "react";
import styled from "styled-components";

import { Field, Input, Label } from "./elements";

const InputType = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Type = styled.div`
  display: inline-block;
  background-color: #f5f5f5;
  border-right: 1px solid #999;
  border-radius: 3px 0 0 3px;
  padding: 0.6em 0;
  width: 2.9em;
  font-weight: 600;
  font-size: 1em;
  text-align: center;
  line-height: normal;
  position: absolute;
  left: 1px;
  top: 1px;
  z-index: 4;
  text-decoration: none;
`;

export default ({ answer }) => (
  <Field>
    <Label description={answer.description}>{answer.label}</Label>
    <InputType>
      <Type>£</Type>
      <Input type="text" />
    </InputType>
  </Field>
);
