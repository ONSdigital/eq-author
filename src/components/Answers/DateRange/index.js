import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import styled from "styled-components";

import withEntityEditor from "components/withEntityEditor";
import answerFragment from "graphql/fragments/answer.graphql";
import { UnwrappedDate } from "components/Answers/Date";

const Wrapper = styled.div`
  width: 100%;
`;

const Fieldset = styled.div`
  margin-bottom: 2em;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const DateRange = ({ answer, onChange, onUpdate }) => (
  <Wrapper data-test="date-range-editor">
    <Fieldset>
      <UnwrappedDate
        onChange={onChange}
        onUpdate={onUpdate}
        name="label"
        label="Label from"
        answer={answer}
        placeholder="eg. From"
      />
    </Fieldset>
    <Fieldset>
      <UnwrappedDate
        onChange={onChange}
        onUpdate={onUpdate}
        name="secondaryLabel"
        label="Label to"
        answer={{ ...answer, label: answer.secondaryLabel }}
        placeholder="eg. To"
      />
    </Fieldset>
  </Wrapper>
);

DateRange.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default withEntityEditor("answer", answerFragment)(DateRange);
