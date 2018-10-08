import React from "react";
import styled from "styled-components";

import { Field, Label, Input } from "components/Forms";
import TextButton from "components/TextButton";

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
  top: -2em;
  left: 0;
  z-index: 999;
`;

const OptionField = styled(Field)`
  margin: 0;
  display: flex;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 0.5em;
  }
`;

const OptionLabel = styled(Label)`
  margin: 0;
`;

const Options = styled.div`
  margin-bottom: 1em;
`;

const Option = option => {
  return (
    <OptionField key={option.id}>
      <OptionLabel>
        <Input type="checkbox" />
        <span>{option.label}</span>
      </OptionLabel>
    </OptionField>
  );
};

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default class extends React.Component {
  state = {
    selectedItems: []
  };

  constructor(props) {
    super(props);
  }

  handleChange = e => {
    console.log(e);

    this.setState({});
  };

  render() {
    const { answer, onClose } = this.props;

    return (
      <Context>
        <CheckboxOptionPicker>
          <Dropdown>
            <div>
              <Options>{answer.options.map(Option)}</Options>
              <Buttons>
                <TextButton onClick={onClose}>DONE</TextButton>
              </Buttons>
            </div>
          </Dropdown>
        </CheckboxOptionPicker>
      </Context>
    );
  }
}
