import { get } from "lodash";
import { RADIO } from "constants/answer-types";

const isAnswerValidForRouting = answer => {
  const type = get(answer, "type");
  return type === RADIO;
};

export default isAnswerValidForRouting;
