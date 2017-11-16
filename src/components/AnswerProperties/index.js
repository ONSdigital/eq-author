import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import { Field, Label, Input } from "components/Forms";
import styled from "styled-components";
import { colors } from "constants/theme";

const FlexField = styled(Field)`
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledCheckboxInput = styled(Input)`
  border: 2px solid ${colors.borders};
  height: 1.4em;
  width: 1.4em;
  margin-right: 0;
`;

const StyledLabel = styled(Label)`
  font-weight: normal;
`;

class AnswerProperties extends React.Component {
  static propTypes = {
    answer: CustomPropTypes.answer.isRequired,
    onBlur: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdateAnswer: PropTypes.func.isRequired
  };

  handleChange = ({ value: mandatory }) => {
    const { id } = this.props.answer;
    this.props.onUpdateAnswer({
      id,
      mandatory
    });
  };

  render() {
    const { answer } = this.props;

    return (
      <FlexField id={`answer${answer.id}-required`} last>
        <StyledLabel>Answer required</StyledLabel>
        <StyledCheckboxInput
          type="checkbox"
          onChange={this.handleChange}
          defaultChecked={answer.mandatory}
          {...this.props}
        />
      </FlexField>
    );
  }
}

export default AnswerProperties;
