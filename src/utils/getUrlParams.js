import { mapValues, pick } from "lodash";

export default params =>
  mapValues(pick(params, ["questionnaireId", "sectionId", "pageId"]), val =>
    parseInt(val, 10)
  );
