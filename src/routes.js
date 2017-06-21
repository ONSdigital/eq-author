import { find } from "lodash";

import QuestionnairePage from "containers/Questionnaire";
import CreateQuestionnaire from "containers/CreateQuestionnaire";
import DesignQuestionnaire from "containers/DesignQuestionnaire";

import NotFound from "pages/NotFound";

import { BaseLayout, SidebarPageLayout, FullPageLayout } from "layouts";

export const routes = [
  {
    path: "/",
    title: "Home",
    component: QuestionnairePage,
    layout: BaseLayout,
    exact: true
  },
  {
    path: "/create",
    title: "New questionnaire",
    component: CreateQuestionnaire,
    layout: FullPageLayout
  },
  {
    path: "/design/:sectionsId?/:questionsId?/:answersId?",
    title: "",
    component: DesignQuestionnaire,
    layout: SidebarPageLayout,
    exact: false
  },
  {
    path: "*",
    title: "",
    component: NotFound,
    layout: FullPageLayout,
    exact: true
  }
];

export const getRouteByPath = (path, routesToSearch = routes) =>
  find(routesToSearch, { path });

export default routes;
