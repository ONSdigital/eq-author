import React from "react";
import { colors, shadow, radius } from "constants/theme";
import styled from "styled-components";
import iconCheckbox from "./icon-checkbox.svg";
import { includes, pull } from "lodash";
import TextBtn from "./TextBtn";

const Field = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;
`;

const Label = styled.label`
  font-size: 0.9em;
  padding-left: 1em;
`;

const Checkbox = styled.input.attrs({
  type: "checkbox"
})`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  padding: 0;
  margin: 0;
  vertical-align: middle;
  appearance: none;
  font-size: 1em;
  border-radius: 3px;
  border: 1px solid ${colors.borders};
  font-size: 0.9em;
  flex: 0 0 auto;

  &:checked {
    background: url(${iconCheckbox}) no-repeat center;
    background-size: 0.8em auto;
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.lightBlue};
  }
`;

const CheckboxField = styled(Field)`
  align-items: flex-start;
  margin-bottom: 0.75em;
  padding: 0;
`;

const Popup = styled.div`
  border-radius: ${radius};
  background-color: ${colors.white};
  box-shadow: ${shadow};
  border-bottom: 1px solid #ddd;
  padding: 1em;
  position: absolute;
  width: 20em;
  top: -2.8em;
  z-index: 9999;
  display: flex;
  margin-top: 2em;
  border-top: 1px solid #f3f1f1;
  display: flex;
  flex-direction: column;
`;

const DoneBtn = styled(TextBtn)`
  align-self: flex-end;
  margin-right: 0.5em;
`;

const Fieldset = styled.fieldset`
  padding: 0;
  border: 0;
  margin: 0;
`;

const Legend = styled.legend`
  margin: 0 0 1.3em;
  line-height: 1.5;
`;

const BtnSelectAll = styled.button.attrs({
  type: "button"
})`
  background-color: transparent;
  border: none;
  display: inline-block;
  color: #1ca8f4;
  background: transparent;
  padding: 0;
  font-weight: 900;
  font-size: 0.6em;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  transition: all 300ms ease-out;
  text-transform: uppercase;
  &:hover,
  &:focus {
    outline: none;
    color: #178ccc;
  }
`;

class OptionSelectorPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOptions: props.selectedOptions };
  }

  handleInputChange = e => {
    const { id } = e.target;
    const selectedOptions = [...this.state.selectedOptions];
    const checked = includes(selectedOptions, id);

    checked ? pull(selectedOptions, id) : selectedOptions.push(id);

    this.setState({
      selectedOptions
    });
  };

  handleSelectAllClick = e => {
    this.setState({
      selectedOptions: this.props.options.map(({ id }) => id)
    });
  };

  handleDoneClick = e => {
    this.props.onSelectOptions(this.state.selectedOptions);
  };

  render() {
    const { options } = this.props;
    const { selectedOptions } = this.state;

    return (
      <Popup>
        <Fieldset>
          <Legend>
            <BtnSelectAll onClick={this.handleSelectAllClick}>
              Select all
            </BtnSelectAll>
          </Legend>
          <div>
            {options.map((option, index) => {
              return (
                <CheckboxField key={option.id}>
                  <Checkbox
                    id={option.id}
                    checked={includes(selectedOptions, option.id)}
                    onChange={this.handleInputChange}
                  />
                  <Label
                    htmlFor={option.id}
                    style={{ fontSize: "0.9em", marginTop: "0.2em" }}
                  >
                    {option.label}
                  </Label>
                </CheckboxField>
              );
            })}
          </div>
        </Fieldset>

        <DoneBtn onClick={this.handleDoneClick}>DONE</DoneBtn>
      </Popup>
    );
  }
}

export default OptionSelectorPopup;
