import React from "react";
import PropTypes from "prop-types";

import Button from "../../Button";
import { Field, Input, Label } from "../../Forms";

import SeamlessInput from "../../QuestionnaireDesign/SeamlessInput";
import SeamlessTextArea from "../../QuestionnaireDesign/SeamlessTextArea";

import styled from "styled-components";

const CheckboxAnswerWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
`;

const CheckboxOptions = styled.div`margin: 1em 0;`;

const CheckboxOption = styled.div`
  border: 1px solid #e5e5e5;
  padding: 1em 1em 0em 1em;
  border-radius: 4px;

  &:not(:first-child) {
    margin-top: .5em;
  }
`;

const SeamlessLabel = styled(SeamlessInput)`
  display: inline-block !important;
  width: auto;
`;

const answer = {
  title: ""
};

const AddOtherLink = styled.a`
  color: #48a6f6;
  text-decoration: none;
`;

const StyledCheckboxInput = styled(Input)`
  border: 2px solid #979797;
  height: 1.4em;
  width: 1.4em;
`;

const OtherOption = styled.small`margin: 0 .5em;`;

const CheckboxAnswer = ({ options, onChange, onAddOption, onAddOther }) => {
  return (
    <CheckboxAnswerWrapper>
      <CheckboxOptions>
        {options &&
          options.map(option =>
            <CheckboxOption key={option.id}>
              <Field id="test">
                <StyledCheckboxInput type="checkbox" disabled />
                <SeamlessLabel
                  placeholder="Label"
                  size="medium"
                  onChange={onChange}
                  value={option.label}
                />
              </Field>
              <Field id="test">
                <SeamlessTextArea
                  cols="30"
                  rows="5"
                  placeholder="Optional description"
                  onChange={onChange}
                  value={option.description}
                />
              </Field>
            </CheckboxOption>
          )}
      </CheckboxOptions>
      <div>
        <Button secondary onClick={onAddOption}>
          Add another option
        </Button>
        <OtherOption>
          or{" "}
          <AddOtherLink href="#" onClick={onAddOther}>
            add other
          </AddOtherLink>
        </OtherOption>
      </div>
    </CheckboxAnswerWrapper>
  );
};

CheckboxAnswer.defaultProps = {
  options: [
    {
      id: 1,
      label: "",
      description: ""
    }
  ]
};

CheckboxAnswer.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ),
  onChange: PropTypes.func.isRequired,
  onAddOption: PropTypes.func.isRequired,
  onAddOther: PropTypes.func.isRequired
};

export default CheckboxAnswer;
