import React from 'react'
import {storiesOf} from '@kadira/storybook'
import {Sidebar, SidebarSection} from 'components/Sidebar'
import {TreeMenuContainer} from 'components/TreeMenu'
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
        <TreeMenuContainer sections={[]} />
      </SidebarSection>
    </Sidebar>
  ))
  .add('Not Empty', () => (
    <Sidebar>
      <SidebarSection title={'Sections'}>
        <TreeMenuContainer sections={[{
          "id": "number-of-employees-section",
          "name": "Number of employees",
          "questions": [{
            "id": "number-of-employees-question",
            "name": "Employees",
            "answers": [{
              "id": "number-of-employees-male-more-30-hours",
              "name": "Number of male employees working more than 30 hours per week",
            }, {
              "id": "number-of-employees-male-less-30-hours",
              "name": "Number of male employees working 30 hours or less per week",
            }, {
              "id": "number-of-employees-female-more-30-hours",
              "name": "Number of female employees working more than 30 hours per week",
            }, {
              "id": "number-of-employees-female-less-30-hours",
              "name": "Number of female employees working 30 hours or less per week",
            }, {
              "id": "number-of-employees-total",
              "name": "Total number of employees",
            }]
          }
        ]
      }]} />
      </SidebarSection>
    </Sidebar>
  ))
