import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors, radius } from "constants/theme";
import BasicAnswer from "components/Answers/BasicAnswer";
import DummyTextInput from "components/Answers/Dummy/TextInput";

const StyledSpan = styled.span`
  display: inline-block;
  background-color: #f5f5f5;
  border-right: 1px solid ${colors.borders};
  border-radius: ${radius} 0 0 ${radius};
  padding: 0.6em 0;
  width: 2.5em;
  font-weight: 700;
  font-size: 1em;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const FieldWrapper = styled.div`
  display: block;
  width: 100%;
  margin-bottom: 1em;
  position: relative;
`;

const CurrencyComponent = props =>
  <StyledSpan>
    {props.currencyUnit}
  </StyledSpan>;

CurrencyComponent.propTypes = {
  currencyUnit: PropTypes.string
};

CurrencyComponent.defaultProps = {
  currencyUnit: "£"
};

const CurrencyAnswer = props =>
  <BasicAnswer {...props}>
    <FieldWrapper>
      <CurrencyComponent />
      <DummyTextInput />
    </FieldWrapper>
  </BasicAnswer>;

export default CurrencyAnswer;
