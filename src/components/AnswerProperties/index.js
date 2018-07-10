import React from "react";
import PropTypes from "prop-types";
import { isBoolean, isNumber, merge, startCase } from "lodash";
import { flow, keys, map, pick } from "lodash/fp";

import CustomPropTypes from "custom-prop-types";
import { Field, Label, Number } from "components/Forms";
import ToggleSwitch from "components/ToggleSwitch";
import styled from "styled-components";

const InlineField = styled(Field)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.2em 0;
  margin-bottom: 0;
`;

const answerProps = ["required", "decimals"];

class AnswerProperties extends React.Component {
  static propTypes = {
    answer: CustomPropTypes.answer.isRequired,
    onSubmit: PropTypes.func,
    onUpdateAnswer: PropTypes.func.isRequired
  };

  handleChange = propName => ({ value }) => {
    const { id, properties: currentProperties } = this.props.answer;
    const properties = merge({}, currentProperties, {
      [propName]: value
    });

    this.props.onUpdateAnswer({
      id,
      properties
    });
  };

  renderControl = name => {
    const { answer } = this.props;
    const id = `answer-${answer.id}-${name}`;

    return (
      <InlineField key={id}>
        <Label bold={false} inline htmlFor={id}>
          {startCase(name)}
        </Label>
        {isBoolean(answer.properties[name]) && (
          <ToggleSwitch
            id={id}
            name={id}
            onChange={this.handleChange(name)}
            checked={answer.properties[name]}
          />
        )}
        {isNumber(answer.properties[name]) && (
          <Number
            id={id}
            name={id}
            onChange={this.handleChange(name)}
            value={answer.properties[name]}
            max={6} //System limit enforced by eq-runner
          />
        )}
      </InlineField>
    );
  };

  renderProperties = props =>
    flow(
      pick(props),
      keys,
      map(this.renderControl)
    );

  render() {
    const {
      answer: { properties }
    } = this.props;
    return <div>{this.renderProperties(answerProps)(properties)}</div>;
  }
}

export default AnswerProperties;
