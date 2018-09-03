import { get } from "lodash";
import { RADIO, NUMBER, CURRENCY, DATE } from "constants/answer-types";

const isAnswerValidForRouting = answer => {
  const type = get(answer, "type");
  return (
    type === RADIO || type === NUMBER || type === CURRENCY || type === DATE
  );
};

export default isAnswerValidForRouting;
