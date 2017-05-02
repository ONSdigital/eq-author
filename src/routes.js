import {FullPageLayout, TabbedPageLayout, SidebarPageLayout} from './layouts/'
import {SurveyDesignPage} from './pages'
import SurveyPage from 'containers/Survey'
import CreateSurvey from 'containers/CreateSurvey'

const routes = [
  {
    path: '/',
    component: SurveyPage,
    layout: FullPageLayout
  },
  {
    path: '/create',
    component: CreateSurvey,
    layout: TabbedPageLayout,
    title: 'Create a survey'
  },
  {
    path: '/design',
    component: SurveyDesignPage,
    layout: SidebarPageLayout,
  }
]

export default routes
