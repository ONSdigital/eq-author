import { find } from "lodash";

import QuestionnairesPage from "containers/QuestionnairesPage";
import QuestionnaireCreatePage from "containers/QuestionnaireCreatePage";
import QuestionnaireMetaPage from "containers/QuestionnaireMetaPage";
import QuestionnaireDesignPage from "containers/QuestionnaireDesignPage";
import NotFoundPage from "containers/NotFoundPage";

export const routes = [
  {
    path: "/",
    title: "Home",
    component: QuestionnairesPage,
    exact: true
  },
  {
    path: "/questionnaire/create",
    title: "New questionnaire",
    component: QuestionnaireCreatePage
  },
  {
    path: "/questionnaire/:id/meta",
    title: "Questionairre meta",
    component: QuestionnaireMetaPage
  },
  {
    path: "/questionnaire/:id/design",
    title: "",
    component: QuestionnaireDesignPage,
    exact: false
  },
  {
    path: "*",
    title: "",
    component: NotFoundPage,
    exact: true
  }
];

export const getRouteByPath = (path, routesToSearch = routes) =>
  find(routesToSearch, { path });

export default routes;
