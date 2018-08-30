import { get } from "lodash";
import { RADIO, NUMBER, CURRENCY } from "constants/answer-types";

const isAnswerValidForRouting = answer => {
  const type = get(answer, "type");
  return type === RADIO || type === NUMBER || type === CURRENCY;
};

export default isAnswerValidForRouting;
