import React, {Component} from 'react'

import Field from './Field'
import Input from './Input'
import TextArea from './TextArea'
import Label from './Label'

export default class GuidanceFields extends Component {
  render() {
    const { guidance: {title, text} } = this.props
    return (
      <div>
        <Field>
          <Label htmlFor="guidancetitle">Guidance Title</Label>
          <Input value={title} id="guidancetitle" name="guidance.title" />
        </Field>
        <Field>
          <Label htmlFor="guidancetext">Guidance Text</Label>
          <TextArea value={text} id="guidancetext" name="guidance.text" rows="10" />
        </Field>
      </div>
    )
  }
}
