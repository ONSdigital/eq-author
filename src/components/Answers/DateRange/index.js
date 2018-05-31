import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import DummyDate from "components/Answers/Dummy/Date";
import styled from "styled-components";
import { Field } from "components/Forms";
import WrappingInput from "components/WrappingInput";
import withEntityEditor from "components/withEntityEditor";
import answerFragment from "graphql/fragments/answer.graphql";

const Wrapper = styled.div`
  width: 100%;
`;

const Fieldset = styled.div`
  margin-bottom: 1em;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const DateRange = ({ answer, onChange, onUpdate, ...otherProps }) => (
  <Wrapper>
    <Fieldset>
      <Field>
        <WrappingInput
          name="label"
          placeholder="From"
          size="medium"
          onChange={onChange}
          onBlur={onUpdate}
          value={answer.childAnswers[0].label}
          data-autofocus
          data-test="date-answer-label"
        />
      </Field>
      <DummyDate />
    </Fieldset>
    <Fieldset>
      <Field>
        <WrappingInput
          name="secondaryLabel"
          placeholder="To"
          size="medium"
          onChange={onChange}
          onBlur={onUpdate}
          value={answer.childAnswers[0].label}
          data-autofocus
          data-test="date-answer-secondary-label"
        />
      </Field>
      <DummyDate />
    </Fieldset>
  </Wrapper>
);

DateRange.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default withEntityEditor("answer", answerFragment)(DateRange);
