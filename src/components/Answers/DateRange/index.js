import React from "react";
import DummyDateRange from "components/Answers/Dummy/DateRange";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50%;
`;

const DateRange = () => (
  <Wrapper>
    <DummyDateRange />
  </Wrapper>
);

export default DateRange;
