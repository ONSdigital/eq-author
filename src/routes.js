import SurveyPage from "containers/Survey";
import CreateSurvey from "containers/CreateSurvey";
import DesignSurvey from "containers/DesignSurvey";
import NotFound from "pages/NotFound";

import { SidebarPageLayout, TabbedPageLayout, FullPageLayout } from "layouts";

const routes = [
  {
    path: "/",
    component: SurveyPage,
    layout: FullPageLayout,
    exact: true
  },
  {
    path: "/create",
    title: "Create a survey",
    component: CreateSurvey,
    layout: TabbedPageLayout
  },
  {
    path: "/design/:sectionsId?/:questionsId?/:answersId?",
    component: DesignSurvey,
    layout: SidebarPageLayout,
    exact: false
  },
  {
    path: "*",
    component: NotFound,
    layout: FullPageLayout,
    exact: true
  }
];

export default routes;
