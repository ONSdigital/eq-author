import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import Date from "../Date";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const DateRange = ({ answer, ...otherProps }) => (
  <Wrapper data-test="date-range-editor">
    {answer.childAnswers.map(answer => (
      <Date key={answer.id} answer={answer} {...otherProps} />
    ))}
  </Wrapper>
);
DateRange.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default DateRange;
