import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Checkbox from './index'

storiesOf('Checkbox', module)
  .add('checked', () => (
    <Checkbox checked={true} />
  ))
  .add('unchecked', () => (
    <Checkbox checked={false} />
  ))
