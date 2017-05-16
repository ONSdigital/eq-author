import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Select from 'components/Forms/Select'

const props = {
  options: [
    'Default',
    'UKIS',
    'Census'
  ]
}

storiesOf('Select', module)
  .add('Default', () => (
    <Select defaultValue={props.options[0]} {...props} />
  ))
