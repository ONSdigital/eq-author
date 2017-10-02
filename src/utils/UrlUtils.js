import { pick } from "lodash";

export const getLink = (questionnaireId, sectionId, pageId) =>
  `/questionnaire/${questionnaireId}/design/${sectionId}/${pageId}`;

export const getUrlParams = params =>
  pick(params, ["questionnaireId", "sectionId", "pageId"]);
