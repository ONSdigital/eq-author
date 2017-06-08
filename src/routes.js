
import { find } from "lodash";

import QuestionnairePage from "containers/Survey";
import CreateQuestionnaire from "containers/CreateSurvey";
import DesignQuestionnaire from "containers/DesignSurvey";

import NotFound from "pages/NotFound";

import { SidebarPageLayout, TabbedPageLayout, FullPageLayout } from "layouts";

export const routes = [
  {
    path: "/",
    component: QuestionnairePage,
    layout: FullPageLayout,
    title: "Home",
    exact: true
  },
  {
    path: "/create",
    title: "Create a questionnaire",
    component: CreateQuestionnaire,
    layout: TabbedPageLayout
  },
  {
    path: "/design/:sectionsId?/:questionsId?/:answersId?",
    component: DesignQuestionnaire,
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
