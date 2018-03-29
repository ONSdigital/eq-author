import { pick } from "lodash";

export const getLink = (questionnaireId, sectionId, pageId) =>
  pageId
    ? `/questionnaire/${questionnaireId}/design/${sectionId}/${pageId}`
    : `/questionnaire/${questionnaireId}/design/${sectionId}`;

export const getUrlParams = params =>
  pick(params, ["questionnaireId", "sectionId", "pageId"]);
