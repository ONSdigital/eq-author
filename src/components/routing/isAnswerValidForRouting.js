import { get } from "lodash";
import {
  RADIO,
  NUMBER,
  CURRENCY,
  DATE,
  CHECKBOX
} from "constants/answer-types";

const isAnswerValidForRouting = answer => {
  const type = get(answer, "type");
  return (
    type === CHECKBOX ||
    type === RADIO ||
    type === NUMBER ||
    type === CURRENCY ||
    type === DATE
  );
};

export default isAnswerValidForRouting;
