import SurveyPage from 'containers/Survey';
import CreateSurvey from 'containers/CreateSurvey';
import DesignSurvey from 'containers/DesignSurvey';
import NotFound from 'pages/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    component: SurveyPage,
  },
  {
    path: '/create',
    component: CreateSurvey,
    title: 'Create a survey',
  },
  {
    path: '/design/:id?',
    component: DesignSurvey,
    exact: false,
  },
  {
    path: '*',
    component: NotFound,
    exact: true,
  }
];

export default routes;
