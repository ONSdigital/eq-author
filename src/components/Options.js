import React, {Component} from 'react'

import Field from './Field'
import Label from './Label'
import TextArea from './TextArea'

export default class Options extends Component {
  handleChange = e => {
    e.stopPropagation()
    const options = e.target.value.split('\n')
      .map(value => ({
        label: value,
        value: value.toLowerCase().replace(' ', '-')
      }))
    this.props.onChange({
      key: 'answers[0].options',
      value: options
    })
  }

  render() {
    const {options} = this.props
    const value = options.map(option => option.value).join('\n')
    return (
      <Field>
        <Label>Answer Options</Label>
        <TextArea value={value} rows={options.length + 1} onChange={this.handleChange}/>
      </Field>
    )
  }
}
