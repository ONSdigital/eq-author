import React, { Component } from "react";
import styled from "styled-components";
import Button from "components/Button";
import Icon from "./icon-add";

export const EDIT_MODE = "editMode";
export const BUTTON_MODE = "buttonMode";
export const LABEL_MODE = "labelMode";

const ClearButton = styled(Button)`
  color: white;
  padding: 0;
  line-height: 1.4;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  position: relative;
  &:hover {
    opacity: 0.9;
  }
`;

const AddIcon = styled(Icon)`
  position: absolute;
  left: 0.4rem;
`;

const Input = styled.input`
  border: none;
  font-size: 0.8em;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.5em 1.5em;
  border-radius: 0;
  &:focus {
    outline: none;
    border: none;
  }
`;

const FormLabel = styled.label`
  display: none;
`;

const Label = styled.div`
  color: white;
  padding: 0.1em 0.5em;
`;

export default class AddButton extends Component {
  static defaultProps = {
    mode: BUTTON_MODE
  };

  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
      value: ""
    };
  }

  onClick = e => {
    if (!this.state.editMode) {
      this.setState({ mode: EDIT_MODE });
    }
  };
  inputRef = input => {
    if (!input) return false;
    input.focus();
    input.addEventListener("blur", this.onInputBlur);
    input.addEventListener("keydown", this.onInputKeyDown);
  };
  onInputBlur = e => {
    if (this.state.value.length > 0) {
      this.props.onApplyLabel(this.state.value);
    } else {
      this.setState({ mode: this.props.mode });
    }
  };
  onInputKeyDown = e => {
    const input = e.target;
    const ENTER_KEY = 13;
    const ESC_KEY = 27;
    this.setState({ value: input.value });
    switch (e.keyCode) {
      case ENTER_KEY:
        if (input.value.length > 0) {
          input.removeEventListener("blur", this.onInputBlur);
          input.removeEventListener("keydown", this.onInputKeyDown);
          this.props.onApplyLabel(input.value);
        }
        break;

      case ESC_KEY:
        input.removeEventListener("blur", this.onInputBlur);
        input.removeEventListener("keydown", this.onInputKeyDown);
        this.setState({ mode: this.props.mode });
        this.props.onCancel();
        break;

      default:
      // do nothing
    }
  };
  render() {
    const { children, editLabel, className } = this.props;
    const { mode, label } = this.state;
    return (
      <div className={className}>
        {
          {
            [BUTTON_MODE]: (
              <ClearButton clear small onClick={this.onClick}>
                <AddIcon />{children}
              </ClearButton>
            ),
            [EDIT_MODE]: (
              <div>
                <FormLabel>{editLabel}</FormLabel>
                <Input placeholder={editLabel} innerRef={this.inputRef} />
              </div>
            ),
            [LABEL_MODE]: <Label>{label}</Label>
          }[mode]
        }
      </div>
    );
  }
}
