/* eslint-disable no-unused-vars */

import React from "react";
import styled from "styled-components";

import { Field, Label, Input } from "components/Forms";
import TextButton from "../TextButton";

import { includes, pull, concat } from "lodash";

const Dropdown = styled.div`
  width: 20em;
  background: white;
  border-radius: 4px;
  padding: 1em;
  border: 0 solid #666;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`;

const CheckboxOptionPicker = styled.div`
  position: absolute;
  top: 0;
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
  margin: 0 0 0.5em;
  display: flex;
  align-items: flex-start;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 1em;
`;

const CheckboxInput = styled(Input).attrs({ type: "checkbox" })`
  flex: 0 0 auto;
  margin-top: 0.1em;
`;

const MutuallyExclusiveOption = styled.div`
  border-top: 1px solid #efefef;
  padding: 0.5em 0 0;
  margin-top: 0.5em 0;
`;

const Option = ({ option, selectedOptions, onChange, label }) => (
  <OptionField key={option.id}>
    <OptionLabel>
      <CheckboxInput
        name={option.id}
        checked={includes(selectedOptions, option.id)}
        onChange={onChange}
      />
      <span>{label || option.label}</span>
    </OptionLabel>
  </OptionField>
);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: props.selectedOptions
    };
  }

  handleChange = ({ name, value }) => {
    let { selectedOptions } = this.state;

    this.setState({
      selectedOptions: value
        ? concat(selectedOptions, name)
        : pull(selectedOptions, name)
    });
  };

  render() {
    const { answer, onClose } = this.props;
    const { selectedOptions } = this.state;
    return (
      <CheckboxOptionPicker>
        <Dropdown>
          <div>
            <Title>Choose options</Title>
            {answer.options.map(option => (
              <Option
                key={option.id}
                option={option}
                selectedOptions={selectedOptions}
                onChange={this.handleChange}
              />
            ))}
            {answer.mutuallyExclusiveOption && (
              <MutuallyExclusiveOption>
                <Option
                  key={answer.mutuallyExclusiveOption.id}
                  option={answer.mutuallyExclusiveOption}
                  selectedOptions={selectedOptions}
                  onChange={this.handleChange}
                />
              </MutuallyExclusiveOption>
            )}
            {answer.other && (
              <MutuallyExclusiveOption>
                <Option
                  key={answer.other.option.id}
                  option={answer.other.option}
                  label={`or ${answer.other.option.label}`}
                  selectedOptions={selectedOptions}
                  onChange={this.handleChange}
                />
              </MutuallyExclusiveOption>
            )}
            <Buttons onClick={() => onClose(selectedOptions)}>
              <TextButton>DONE</TextButton>
            </Buttons>
          </div>
        </Dropdown>
      </CheckboxOptionPicker>
    );
  }
}
