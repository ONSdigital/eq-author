import React from "react";
import styled, { css } from "styled-components";

import { CHECKBOX, RADIO } from "constants/answer-types";
import Error from "./ValidationError";
import { Field } from "./elements";

const Legend = styled.div`
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const radioInput = css`
  border-radius: 100px;
  box-shadow: inset 0 0 0 3px #fff;
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid #9b9b9b;
  padding: 0.5em;
  font-size: 1em;
  background: #eee;
  box-shadow: inset 0 0 0 3px white;
  pointer-events: none;
  position: absolute;
  top: 0.6em;
  left: 0.5em;

  ${props => props.type === RADIO && radioInput};
`;

const OptionLabel = styled.label`
  display: block;
  font-size: 1em;
  color: inherit;
  line-height: 1.4;
  font-weight: 400;
  padding: 0.7em 1em 0.7em 2.5em;
  margin: 0;
`;

const OptionDescription = styled.div`
  font-size: 0.8em;
  margin-top: 0.5em;
`;

const OptionItem = styled.div`
  font-size: 1em;
  background: #fff;
  border: 1px solid #999;
  border-radius: 0.2em;
  width: auto;
  min-width: 20em;
  display: inline-block;
  overflow: hidden;
  position: relative;
  margin-bottom: 0.25em;
`;

const SelectAll = styled.div`
  margin-bottom: 0.5em;
`;

const OtherLabel = styled.div`
  margin-bottom: 0.5em;
  font-size: 0.8em;
  font-weight: bold;
`;

const TextInput = styled.input`
  padding: 0.6em;
  display: block;
  color: inherit;
  font-size: 1em;
  border: 1px solid #999;
  border-radius: 3px;
  width: 100%;
`;

const OtherField = styled.div`
  padding: 0 0.5em 0.5em;
`;

const MutuallyExclusiveOption = styled.div`
  margin-top: 1em;
`;

const MutuallyExclusiveOptionTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const Option = ({ option, type, answer }) => (
  <OptionItem>
    <Input type={type} />
    <OptionLabel>
      {option.label || <Error>No label supplied</Error>}
      {option.description && (
        <OptionDescription>{option.description}</OptionDescription>
      )}
    </OptionLabel>
    {answer && (
      <OtherField>
        <OtherLabel>{answer.label}</OtherLabel>
        <TextInput type="text" />
      </OtherField>
    )}
  </OptionItem>
);

export default ({ answer }) => {
  return (
    <Field>
      <Legend>{answer.label}</Legend>
      {answer.type === CHECKBOX && (
        <SelectAll>Select all that apply:</SelectAll>
      )}
      {answer.options.map(option => (
        <Option key={option.id} option={option} type={answer.type} />
      ))}
      {answer.other && (
        <Option
          option={answer.other.option}
          answer={answer.other.answer}
          type={answer.type}
        />
      )}
      {answer.mutuallyExclusiveOption && (
        <MutuallyExclusiveOption>
          <MutuallyExclusiveOptionTitle>Or</MutuallyExclusiveOptionTitle>
          <Option option={answer.mutuallyExclusiveOption} type={answer.type} />
        </MutuallyExclusiveOption>
      )}
    </Field>
  );
};
