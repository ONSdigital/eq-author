import { memoize, curry } from "lodash";
import pathToRegexp from "path-to-regexp";
import { matchPath } from "react-router";

export { matchPath };

// react-router will eventually offer this exact function.
// at that point we can drop this component
const compile = memoize(path => pathToRegexp.compile(path));
export const generatePath = curry((path, params) => compile(path)(params));

export const Routes = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  QUESTIONNAIRE: `/questionnaire/:questionnaireId/:sectionId?/:pageId?`,
  SECTION: `/questionnaire/:questionnaireId/:sectionId(\\d+)/design`,
  PAGE: `/questionnaire/:questionnaireId/:sectionId(\\d+)/:pageId(\\d+)/design`
};

export const buildSectionPath = generatePath(Routes.SECTION);
export const buildPagePath = generatePath(Routes.PAGE);
export const buildQuestionnairePath = generatePath(Routes.QUESTIONNAIRE);
