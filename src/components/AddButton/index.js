import React, {Component} from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
import Icon from './icon-add'

const EDIT_MODE = "editMode"
const BUTTON_MODE = "buttonMode"
const LABEL_MODE = "labelMode"

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
`

const AddIcon = styled(Icon)`
  position: absolute;
  left: 0.4rem;
`

const Input = styled.input`
  border: none;
  font-size: 0.8em;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  &:focus {
    outline: none;
  }
`

const FormLabel = styled.label`
  display: none;
`

const Label = styled.div`
  color: white;
  padding: 0.1em 0.5em;
`

export default class AddButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: BUTTON_MODE,
      value: this.props.value
    }
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    })
  }
  onClick = e => {
    if (!this.state.editMode) {
      this.setState({mode: EDIT_MODE})
    }
  }
  inputRef = (input) => {
    if (!input) return false
    input.focus()
    input.addEventListener('blur', this.onInputBlur)
    input.addEventListener('keydown', this.onInputKeyDown)
  }
  onInputBlur = e => {
    this.setState({mode: BUTTON_MODE})
  }
  onInputKeyDown = e => {
    const input = e.target
    const ENTER_KEY = 13
    const ESC_KEY = 27

    switch (e.keyCode) {
      case ENTER_KEY:
        input.removeEventListener('blur', this.onInputBlur)
        input.removeEventListener('keydown', this.onInputKeyDown)
        this.setState({
          mode: LABEL_MODE,
          label: input.value
        })
      break

      case ESC_KEY:
        input.removeEventListener('blur', this.onInputBlur)
        input.removeEventListener('keydown', this.onInputKeyDown)
        this.setState({
          mode: BUTTON_MODE
        })
      break

    }
  }
  render() {
    const {children, editLabel} = this.props
    const {mode, label} = this.state
    return (
      <div>
        {{
          [BUTTON_MODE]: (
            <ClearButton clear small onClick={this.onClick}><AddIcon />{children}</ClearButton>
          ),
          [EDIT_MODE]: (
            <div>
              <FormLabel>{editLabel}</FormLabel>
              <Input placeholder={editLabel} innerRef={this.inputRef} onChange={this.onChange} initialValue={this.state.value} />
            </div>
          ),
          [LABEL_MODE]: (
            <Label>{label}</Label>
          )
        }[mode]}
      </div>
    )
  }
}
