import React from 'react'

import {Sidebar, SidebarSection} from './components/Sidebar'
import {TreeMenuContainer} from './components/TreeMenu'
import {FullPageLayout, TabbedPageLayout, SidebarPageLayout} from './layouts/'
import {SurveyPage, SurveyCreatePage, SurveyDesignPage} from './pages'
import _ from 'lodash'

const DefaultSidebar = (props) => {
  const findAll = (file, key) => {
    if (!file) return []
    if (key in file) return [file[key]]

    return _.flatten(_.map(file, function(v) {
        return typeof v === "object" ? findAll(v, key) : [];
    }), true);
  }

  const sections = _.flatten(findAll(props.file, 'sections'))
  console.log('sections', sections)

  return (
    <Sidebar>
      <SidebarSection title={'Sections'}>
        <TreeMenuContainer sections={sections} />
      </SidebarSection>
    </Sidebar>
  )
}

const routes = [
  {
    path: '/',
    component: SurveyPage,
    layout: FullPageLayout
  },
  {
    path: '/create',
    component: SurveyCreatePage,
    layout: TabbedPageLayout,
    title: 'Create a survey'
  },
  {
    path: '/design',
    component: SurveyDesignPage,
    layout: SidebarPageLayout,
    sidebar: DefaultSidebar
  }
]

export default routes
