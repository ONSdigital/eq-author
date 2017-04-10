import React from 'react'

import {Sidebar, SidebarSection} from './components/Sidebar'
import {FullPageLayout, TabbedPageLayout, SidebarPageLayout} from './layouts/'
import {SurveyPage, SurveyCreatePage, SurveyDesignPage} from './pages'

const DefaultSidebar = () => (
  <Sidebar>
    <SidebarSection title={'Groups'}></SidebarSection>
    <SidebarSection title={'Sections'}></SidebarSection>
  </Sidebar>
)

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
