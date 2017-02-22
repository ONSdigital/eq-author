import React, {Component} from 'react'
import './OptionsInputList.css'
import Label from './Label.js'
import Field from './Field.js'
import Input from './Input.js'
import Link from './Link.js'

export default class OptionsInputList extends Component {
    render() {

      console.log(this.props.options)
      return (
        <div className="options">

          <div className="options__existing">
            <ul className="options__list">
            { this.props.options.map( option => {
              return (
                <li className="options__list-item">
                  {option.label} - <Link text="Remove" />
                </li>
              )
            })}
            </ul>
          </div>

          <fieldset>
            <legend>Add new option</legend>
            <Field>
              <Label htmlFor="label">Label</Label>
              <Input value="" name="label" />
            </Field>
            <Field>
              <Label htmlFor="value">Value</Label>
              <Input value="" name="value" />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input value="" name="description" />
            </Field>

            <button type="button" className="button">Add option</button>
          </fieldset>
        </div>
      )
    }
}
