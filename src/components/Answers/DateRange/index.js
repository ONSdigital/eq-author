import React from "react";
import PropTypes from "prop-types";
import DummyDate from "components/Answers/Dummy/Date";
import styled from "styled-components";

import { colors } from "constants/theme";

const Wrapper = styled.div`
  width: 100%;
`;

const Fieldset = styled.div`
  margin-bottom: 1em;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Legend = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: ${colors.text};
  margin-top: 0;
  margin-bottom: 0.8em;
`;

const DateRange = ({ legendFrom, legendTo, ...otherProps }) => (
  <Wrapper>
    <Fieldset>
      <Legend>{legendFrom}</Legend>
      <DummyDate />
    </Fieldset>
    <Fieldset>
      <Legend>{legendTo}</Legend>
      <DummyDate />
    </Fieldset>
  </Wrapper>
);

DateRange.propTypes = {
  legendFrom: PropTypes.string.isRequired,
  legendTo: PropTypes.string.isRequired
};

DateRange.defaultProps = {
  legendFrom: "Period from",
  legendTo: "Period to"
};

export default DateRange;
