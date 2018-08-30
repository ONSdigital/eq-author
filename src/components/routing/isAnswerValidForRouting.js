import { get } from "lodash";
import { RADIO, NUMBER } from "constants/answer-types";

const isAnswerValidForRouting = answer => {
  const type = get(answer, "type");
  return type === RADIO || type === NUMBER;
};

export default isAnswerValidForRouting;
