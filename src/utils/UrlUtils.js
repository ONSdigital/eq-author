import { pick } from "lodash";

export const getLink = (questionnaireId, sectionId, pageId, tab = "design") =>
  `/questionnaire/${questionnaireId}/${tab}/${sectionId}/${pageId}`;

export const getUrlParams = params =>
  pick(params, ["questionnaireId", "sectionId", "pageId"]);
