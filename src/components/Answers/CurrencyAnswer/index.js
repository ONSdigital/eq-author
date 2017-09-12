import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Field, Input } from "components/Forms";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import styled from "styled-components";
import { colors, radius } from "constants/theme";
import withEntityEditor from "components/withEntityEditor";

const StyledInput = styled(Input)`
  padding-left: 2em;
  position: relative;
  background-color: transparent;
  z-index: 2;
`;

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

export const StatelessCurrencyAnswer = ({ answer, onChange, onUpdate }) =>
  <div>
    <Field id="label">
      <SeamlessInput
        placeholder="Label"
        size="medium"
        onChange={onChange}
        onBlur={onUpdate}
        value={answer.label}
        data-autoFocus
      />
    </Field>
    <Field id="description">
      <SeamlessTextArea
        cols="30"
        rows="5"
        placeholder="Enter a description (optional)…"
        onChange={onChange}
        onBlur={onUpdate}
        value={answer.description}
      />
    </Field>
    <FieldWrapper>
      <CurrencyComponent />
      <StyledInput disabled />
    </FieldWrapper>
  </div>;

StatelessCurrencyAnswer.propTypes = {
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default withEntityEditor("answer")(StatelessCurrencyAnswer);
