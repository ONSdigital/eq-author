import { find } from "lodash";

import QuestionnairesPage from "containers/QuestionnairesPage";
import QuestionnaireCreatePage from "containers/QuestionnaireCreatePage";
import QuestionnaireMetaPage from "containers/QuestionnaireMetaPage";
import QuestionnaireDesignPage from "containers/QuestionnaireDesignPage";
import NotFoundPage from "containers/NotFoundPage";

import BaseLayout from "layouts/BaseLayout";
import FullPageLayout from "layouts/FullPageLayout";

export const routes = [
  {
    path: "/",
    title: "Home",
    component: QuestionnairesPage,
    layout: BaseLayout,
    exact: true
  },
  {
    path: "/questionnaire/create",
    title: "New questionnaire",
    component: QuestionnaireCreatePage,
    layout: BaseLayout
  },
  {
    path: "/questionnaire/:id/meta",
    title: "Questionairre meta",
    component: QuestionnaireMetaPage,
    layout: FullPageLayout
  },
  {
    path: "/questionnaire/:id/design",
    title: "",
    component: QuestionnaireDesignPage,
    layout: BaseLayout,
    exact: false
  },
  {
    path: "*",
    title: "",
    component: NotFoundPage,
    layout: FullPageLayout,
    exact: true
  }
];

export const getRouteByPath = (path, routesToSearch = routes) =>
  find(routesToSearch, { path });

export default routes;
