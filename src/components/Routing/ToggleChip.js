import React from "react";
import styled from "styled-components";

import { colors } from "constants/theme";
import closeIcon from "./icon-chip-unselected.svg";
import checkIcon from "./icon-chip-check.svg";

const Field = styled.div`
  position: relative;
`;

const Input = styled.input`
  background: url('${props =>
    props.defaultChecked ? checkIcon : closeIcon}') no-repeat 0 0;
  width: 1.5em;
  height: 1.5em;
  border: none;
  position: absolute;
  left: 1em;
  top: 0;
  bottom: 0;
  margin: auto;
  -webkit-appearance: none;
  pointer-events: none;
  &:focus {
    opacity: 1;
    outline: none;
  }
`;

const Label = styled.label`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${props => (props.checked ? "#0288D1" : colors.borders)};
  color: ${props => (props.checked ? colors.white : colors.text)};
  padding: 0.5em 1.5em 0.5em 2.5em;
  font-size: 0.9em;
  margin: 0.2em;
  border-radius: 1em;
  display: flex;
  align-items: center;
  position: relative;
  user-select: none;
  cursor: pointer;
  transition: all 200ms;
  &:hover {
    background: ${props => (props.checked ? "#0479b9" : "#dadada")};
  }
`;

const ToggleChip = ({ label, id, name, checked, onChange }) => (
  <Field>
    <Label checked={checked} htmlFor={id}>
      {label}
    </Label>
    <Input
      id={id}
      name={id}
      defaultChecked={checked}
      type="checkbox"
      onChange={function(e) {
        onChange(name, e.target.checked);
      }}
    />
  </Field>
);

export default ToggleChip;
