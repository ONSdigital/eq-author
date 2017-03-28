import React from 'react'
import {storiesOf} from '@kadira/storybook'
import {Sidebar, SidebarSection} from 'components/Sidebar'
import {TreeMenu} from 'components/TreeMenu'
import {Grid, Column} from 'components/Grid'

const GridCol = (story) => (
  <Grid>
    <Column cols={4}>
      {story()}
    </Column>
  </Grid>
)

storiesOf('Sidebar', module)
  .addDecorator(GridCol)
  .add('Empty', () => (
    <Sidebar>
      <SidebarSection title={'Sections'}>
        <TreeMenu items={[]} />
      </SidebarSection>
    </Sidebar>
  ))
  .add('Not Empty', () => (
    <Sidebar>
      <SidebarSection title={'Sections'}>
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
        }]} />
      </SidebarSection>
    </Sidebar>
  ))
