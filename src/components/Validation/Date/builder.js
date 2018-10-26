import { CUSTOM, PREVIOUS_ANSWER } from "constants/validation-entity-types";
import { flowRight, omit } from "lodash/fp";

import withToggleAnswerValidation from "containers/enhancers/withToggleAnswerValidation";
import withUpdateAnswerValidation from "containers/enhancers/withUpdateAnswerValidation";
import withEntityEditor from "components/withEntityEditor";

import withAnswerValidation from "../withAnswerValidation";

import DateValidation from "./DateValidation";
import { withProps, withPropRenamed, withPropRemapped } from "./enhancers";

const getCustom = (entityType, customDate) => {
  if (entityType === CUSTOM) {
    if (customDate) {
      return customDate;
    }
  }
  return null;
};

const getPreviousAnswer = (entityType, previousAnswer) => {
  if (entityType === PREVIOUS_ANSWER) {
    if (previousAnswer) {
      return previousAnswer.id;
    }
  }
  return null;
};

export const readToWriteMapper = outputKey => ({
  id,
  customDate,
  previousAnswer,
  entityType,
  ...rest
}) => ({
  id,
  [outputKey]: {
    ...omit("enabled", rest),
    entityType,
    custom: getCustom(entityType, customDate),
    previousAnswer: getPreviousAnswer(entityType, previousAnswer)
  }
});

export default (displayName, testId, readKey, writeKey, fragment) => {
  const withEditing = flowRight(
    withProps({ displayName, testId }),
    withAnswerValidation(readKey),
    withUpdateAnswerValidation,
    withToggleAnswerValidation,
    withPropRemapped(
      "onUpdateAnswerValidation",
      "onUpdate",
      readToWriteMapper(writeKey)
    ),
    withEntityEditor(readKey, fragment),
    withPropRenamed(readKey, "date")
  );
  return withEditing(DateValidation);
};
