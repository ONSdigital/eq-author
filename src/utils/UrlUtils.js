import { pick, memoize, curry } from "lodash";
import pathToRegexp from "path-to-regexp";

export const getLink = (questionnaireId, sectionId, pageId) =>
  pageId
    ? `/questionnaire/${questionnaireId}/design/${sectionId}/${pageId}`
    : `/questionnaire/${questionnaireId}/design/${sectionId}`;

export const QUESTIONNAIRE_ROUTE = `/questionnaire/:questionnaireId`;
export const SECTION_ROUTE = `${QUESTIONNAIRE_ROUTE}/:sectionId`;
export const PAGE_ROUTE = `${SECTION_ROUTE}/:pageId`;

const compile = memoize(url => pathToRegexp.compile(url));

export const bindParams = curry((url, params) => {
  const compiled = compile(url);
  return compiled(params);
});
