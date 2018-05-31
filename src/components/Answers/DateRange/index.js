import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import DummyDate from "components/Answers/Dummy/Date";
import styled from "styled-components";
import { Field } from "components/Forms";
import WrappingInput from "components/WrappingInput";
import withEntityEditor from "components/withEntityEditor";
import answerFragment from "graphql/fragments/answer.graphql";
import Date from "../Date";

const Wrapper = styled.div`
  width: 100%;
`;

const Fieldset = styled.div`
  margin-bottom: 1em;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const DateRange = ({ answer, ...otherProps }) =>
  answer.childAnswers.map(answer => (
    <Date key={answer.id} answer={answer} {...otherProps} />
  ));

DateRange.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default DateRange;
