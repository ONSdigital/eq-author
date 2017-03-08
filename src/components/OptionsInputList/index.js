import React, {Component} from 'react'
import Label from 'components/forms/Label'
import Field from 'components/forms/Field'
import Input from 'components/forms/Input'
import Link from 'components/Link'
import styled from 'styled-components'

const StyledOptions = styled.div`
  margin-bottom: 16px;
`;

const StyledOptionsExisting = styled.div`
  border: 1px solid lightgrey;
  padding: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Fieldset = styled.fieldset`
  border: 1px solid lightgrey;
  padding: 20px;
`;
const Legend = styled.legend`
  padding: 0 3px;
`;

const Button = styled.button`
  margin-right: 8px;
`;

export default class OptionsInputList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        label: "",
        value: ""
    }
  }

  onChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
    e.stopPropagation()
  }

  onAddOption = e => {
    const {label, value, description} = this.state
    this.props.onAddOption({
      label: label,
      value: value
    })
    this.setState({
        label: "",
        value: ""
    })
    e.stopPropagation()
  }

    render() {
      return (
        <StyledOptions className="options">

          { this.props.options.length > 0 &&
          <StyledOptionsExisting className="options__existing">
            <List className="options__list">
            { this.props.options.map((option, index) => {
              return (
                <li className="options__list-item" key={index}>
                  {option.label} - <Link text="Remove" onClick={this.props.onRemoveOption} data={index} />
                </li>
              )
            })}
            </List>

          </StyledOptionsExisting>
          }
          { this.props.options.length === 0 &&
            <div className="callout warning panel">{this.props.emptyText}</div>
          }

          <Fieldset>
            <Legend>Add new option</Legend>
            <Field id="label">
              <Label>Label</Label>
              <Input onChange={this.onChange} value={this.state.label} name="label" />
            </Field>
            <Field id="value">
              <Label>Value</Label>
              <Input onChange={this.onChange} value={this.state.value} name="value" />
            </Field>
            <Button type="button"
              className="button"
              onClick={this.onAddOption}>Add option
            </Button>
          </Fieldset>
        </StyledOptions>
      )
    }
}
