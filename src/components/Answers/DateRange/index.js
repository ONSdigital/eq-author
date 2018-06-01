import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import Date from "../Date";

const DateRange = ({ answer, ...otherProps }) =>
  answer.childAnswers.map(answer => (
    <Date key={answer.id} answer={answer} {...otherProps} />
  ));

DateRange.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default DateRange;
