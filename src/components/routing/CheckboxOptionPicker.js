/* eslint-disable no-unused-vars */

import React from "react";
import styled from "styled-components";

import { Field, Label, Input } from "components/Forms";
import TextButton from "../TextButton";

const Context = styled.div`
  position: relative;
`;

const Dropdown = styled.div`
  width: 15em;
  background: white;
  border-radius: 4px;
  padding: 1em;
  border: 0 solid #666;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`;

const CheckboxOptionPicker = styled.div`
  position: absolute;
  top: -1em;
  left: 0;
  z-index: 999;
`;

const OptionField = styled(Field)`
  margin: 0;
  &:not(:last-of-type) {
    margin-bottom: 0.5em;
  }
`;

const OptionLabel = styled(Label)`
  margin: 0;
`;

const Option = option => {
  return (
    <OptionField key={option.id}>
      <OptionLabel>
        <Input type="checkbox" />
        {option.label}
      </OptionLabel>
    </OptionField>
  );
};

export default ({ answer }) => {
  return (
    <Context>
      <CheckboxOptionPicker>
        <Dropdown>{answer.options.map(Option)}</Dropdown>
      </CheckboxOptionPicker>
    </Context>
  );
};
