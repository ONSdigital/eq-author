import { flowRight } from "lodash/fp";

import withToggleAnswerValidation from "containers/enhancers/withToggleAnswerValidation";
import withUpdateAnswerValidation from "containers/enhancers/withUpdateAnswerValidation";
import withEntityEditor from "components/withEntityEditor";

import withAnswerValidation from "../withAnswerValidation";

import DateValidation from "./DateValidation";
import { withProps, withPropRenamed, withPropRemapped } from "./enhancers";

export const readToWriteMapper = outputKey => ({
  id,
  customDate,
  enabled,
  ...rest
}) => ({
  id,
  [outputKey]: {
    ...rest,
    custom: customDate ? customDate : null
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
