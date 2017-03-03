import React, {Component} from 'react'
import Label from 'components/forms/Label'
import Field from 'components/forms/Field'
import Input from 'components/forms/Input'
import Link from 'components/Link'
import './style.css'

export default class OptionsInputList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        label: "",
        value: "",
        description: ""
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
      value: value,
      description: description
    })
    this.setState({
        label: "",
        value: "",
        description: ""
    })
    e.stopPropagation()
  }

    render() {
      return (
        <div className="options">

          { this.props.options.length > 0 &&
          <div className="options__existing">
            <ul className="options__list">
            { this.props.options.map( (option, index) => {
              return (
                <li className="options__list-item" key={option.value}>
                  {option.label} - <Link text="Remove" onClick={this.props.onRemoveOption} data={index} />
                </li>
              )
            })}
            </ul>

          </div>
          }
          { this.props.options.length === 0 &&
            <div className="callout warning panel">{this.props.emptyText}</div>
          }

          <fieldset>
            <legend>Add new option</legend>
            <Field>
              <Label htmlFor="label">Label</Label>
              <Input onChange={this.onChange} value={this.state.label} name="label" />
            </Field>
            <Field>
              <Label htmlFor="value">Value</Label>
              <Input onChange={this.onChange} value={this.state.value} name="value" />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input onChange={this.onChange} value={this.state.description} name="description" />
            </Field>

            <button type="button"
              className="button"
              onClick={this.onAddOption}>Add option</button>
          </fieldset>
        </div>
      )
    }
}
