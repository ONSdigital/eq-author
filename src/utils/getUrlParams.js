import { pick } from "lodash";

export default params =>
  pick(params, ["questionnaireId", "sectionId", "pageId"]);
