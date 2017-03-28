import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { TreeMenu } from 'components/TreeMenu'
import styled from 'styled-components'
import { colorDarkBlue } from 'constants/theme'

const Sidebar = styled.div`
  background: ${colorDarkBlue};
  max-width: 15em;
`

storiesOf('TreeMenu', module)
  .addDecorator(story =>
    <Sidebar>{story()}</Sidebar>)
  .add('With no items', () => (
    <Sidebar>
      <TreeMenu items={[]} open />
    </Sidebar>
  ))
  .add('With items', () => (
    <Sidebar>
      <TreeMenu items={[{
        name: 'Number of employees',
        items: [{
          name: 'Employees',
          items: [{
            name: 'Males working more than 30 hours'
          }, {
            name: 'Males working less than 30 hours'
          }, {
            name: 'Females working more than 30 hours'
          }, {
            name: 'Females working less than 30 hours'
          }]
        }]
      }]} open />
    </Sidebar>
  ))
