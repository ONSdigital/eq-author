import React from "react";
import { Select } from "components/Forms";
import answerTypes from "constants/answer-types";
import { includes } from "lodash";

const TEXT = "text";
const DATE = "date";
const LANGUAGE = "language";
const REGION = "region";

const metaData = [
  {
    id: "ru_ref",
    type: TEXT,
    label: "RU_REF",
    value: "ABCDEF"
  },
  {
    id: "date",
    type: DATE,
    label: "DATE",
    value: "01/12/2018"
  },
  {
    id: "name",
    type: TEXT,
    label: "NAME",
    value: "Joe Bloggs"
  }
];

/* eslint-disable import/no-named-as-default-member */

const typeMappings = {
  [TEXT]: [answerTypes.TEXTFIELD, answerTypes.CURRENCY, answerTypes.NUMBER],
  [DATE]: [answerTypes.DATE]
};

const checkAnswerType = (type, answerType) => {
  return !includes(typeMappings[type], answerType);
};

const MetadataSelect = ({ answerType, ...otherProps }) => (
  <Select {...otherProps}>
    {metaData.map(({ id, label, type, value }) => (
      <option key={id} value={id} disabled={checkAnswerType(type, answerType)}>
        {label} - {value}
      </option>
    ))}
  </Select>
);

export default MetadataSelect;
