import { get } from "lodash";
import { RADIO, CHECKBOX } from "constants/answer-types";

const isAnswerValidForRouting = answer => {
  const type = get(answer, "type");
  return type === RADIO || type === CHECKBOX;
};

export default isAnswerValidForRouting;
