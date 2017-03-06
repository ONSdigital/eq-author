import React from 'react'

import Field from 'components/forms/Field'
import Input from 'components/forms/Input'
import TextArea from 'components/forms/TextArea'
import Label from 'components/forms/Label'

const GuidanceFields = ({ guidance: {title, text} }) => (
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

export default GuidanceFields
