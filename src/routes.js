import { find } from "lodash";

import SurveyPage from "containers/Survey";
import CreateSurvey from "containers/CreateSurvey";
import DesignSurvey from "containers/DesignSurvey";
import NotFound from "pages/NotFound";

import { SidebarPageLayout, TabbedPageLayout, FullPageLayout } from "layouts";

export const routes = [
  {
    path: "/",
    component: SurveyPage,
    layout: FullPageLayout,
    title: "Home",
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

export const getRouteByPath = (path, routesToSearch = routes) =>
  find(routesToSearch, { path });

export default routes;
