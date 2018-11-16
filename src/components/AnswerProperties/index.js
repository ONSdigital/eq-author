import React from "react";
import PropTypes from "prop-types";
import { merge } from "lodash";
import CustomPropTypes from "custom-prop-types";

import {
  Required,
  Decimal,
  DateFormat
} from "components/AnswerProperties/Properties";
import {
  InlineField,
  MultiLineField
} from "components/AnswerProperties/Fields";

import { CURRENCY, DATE, NUMBER } from "constants/answer-types";
import { Label, Select, Field } from "../Forms";
import styled from "styled-components";

const TypeSelect = styled(Select)`
  width: 8em;
`;

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

  getId = (name, { id }) => `answer-${id}-${name}`;

  render() {
    const { answer } = this.props;
    return (
      <React.Fragment>
        <InlineField id={this.getId("required", answer)} label={"Required"}>
          <Required
            data-test="answer-properties-required-toggle"
            id={this.getId("required", answer)}
            onChange={this.handleChange("required")}
            value={answer.properties.required}
          />
        </InlineField>
        {answer.type === NUMBER && (
          <div>
            <InlineField id={this.getId("type", answer)} label={"Type"}>
              <TypeSelect onChange={e => console.log(e)}>
                <optgroup label="Default">
                  <option value="none">Number</option>
                </optgroup>
                <optgroup label="Currency">
                  <option value="pounds">(£) Pounds</option>
                  <option value="dollars">($) Dollars</option>
                  <option value="euros">(€) Euros</option>
                </optgroup>
                <optgroup label="Length">
                  <option value="pounds">(cm) Centimetres</option>
                  <option value="dollars">(m) Metres</option>
                  <option value="euros">(km) Kilometres</option>
                  <option value="euros">(mi) Miles</option>
                </optgroup>
                <optgroup label="Area">
                  <option value="pounds">(cm&sup2;) Square centimetres</option>
                  <option value="pounds">(m&sup2;) Square metres</option>
                  <option value="pounds">(m&sup2;) Square kilometres</option>
                </optgroup>
                <optgroup label="Volume">
                  <option value="pounds">(cm&sup3;) Cubic centimetres</option>
                  <option value="pounds">(m&sup3;) Cubic metres</option>
                  <option value="pounds">(m&sup3;) Cubic kilometres</option>
                </optgroup>
              </TypeSelect>
            </InlineField>
            <br />
            <InlineField id={this.getId("decimals", answer)} label={"Decimals"}>
              <Decimal
                id={this.getId("decimals", answer)}
                onChange={this.handleChange("decimals")}
                value={answer.properties.decimals}
              />
            </InlineField>
          </div>
        )}
        {answer.type === DATE && (
          <MultiLineField
            id={this.getId("date-format", answer)}
            label={"Date type"}
          >
            <DateFormat
              id={this.getId("date-format", answer)}
              onChange={this.handleChange("format")}
              value={answer.properties.format}
            />
          </MultiLineField>
        )}
      </React.Fragment>
    );
  }
}

export default AnswerProperties;
