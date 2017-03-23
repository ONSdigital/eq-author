import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Input from './index'

storiesOf('Input', module)
  .add('without value', () => (
    <Input  />
  ))
  .add('with value', () => (
    <Input value={'hello'} />
  ))
