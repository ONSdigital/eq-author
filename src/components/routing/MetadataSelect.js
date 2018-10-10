import React from "react";
import { Select } from "components/Forms";
import { TEXTFIELD, CURRENCY, NUMBER } from "constants/answer-types";
import { includes } from "lodash";

const TEXT = "text";
const DATE = "date";
const REGION = "region";

const metaData = [
  {
    id: "period_str",
    type: TEXT,
    label: "Period String",
    value: "May 2016"
  },
  {
    id: "period_id",
    type: TEXT,
    label: "Period ID",
    value: "201605"
  },
  {
    id: "collection_exercise_sid",
    type: TEXT,
    label: "Collection Exercise SID",
    value: "789"
  },
  {
    id: "ru_ref",
    type: TEXT,
    label: "RU_REF",
    value: "123456789A"
  },
  {
    id: "ru_name",
    type: TEXT,
    label: "RU Name",
    value: "Essential Enterprise Ltd."
  },
  {
    id: "trading_as",
    type: TEXT,
    label: "Trading as",
    value: "Essential Enterprise Ltd."
  },
  {
    id: "ref_p_start_date",
    type: DATE,
    label: "Ref P Start Date",
    value: "2016-05-01"
  },
  {
    id: "ref_p_end_date",
    type: DATE,
    label: "Ref P End Date",
    value: "2016-05-31"
  },
  {
    id: "region_code",
    type: REGION,
    label: "Region Code",
    value: "GB-ENG"
  },
  {
    id: "minimum_age",
    type: TEXT,
    label: "Minimum Age",
    value: "16"
  }
];

/* eslint-disable import/no-named-as-default-member */

const typeMappings = {
  [TEXT]: [TEXTFIELD, CURRENCY, NUMBER],
  DATE
};

const checkAnswerType = (type, answerType) =>
  !includes(typeMappings[type], answerType);

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
