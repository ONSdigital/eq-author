/* eslint-disable react/no-find-dom-node */
import React from "react";
import { findDOMNode } from "react-dom";
import Input from "components/Forms/Input";
import styled from "styled-components";
import PropTypes from "prop-types";
import { clamp } from "lodash";
import arrowIcon from "./arrow.svg";

const NumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled(Input)`
  &[type=number]::-webkit-inner-spin-button, 
  &[type=number]::-webkit-outer-spin-button { 
      appearance: none;
      margin: 0; 
  }
   &[type=number] {
    -moz-appearance: textfield;
  }
  
  width: 4em;
`;

const SpinnerButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SpinnerButton = styled.button`
  border: none;
  width: 18px;
  height: 18px;
  background: url(${arrowIcon}) no-repeat;
  background-size: 18px 18px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
    transition: opacity .2s ease-in-out;
  }

  transform: scaleY(${props => (props["data-inverted"] ? -1 : 1)});
`;

class NumberInput extends React.Component {
  handleUp = () => {
    const name = this.props.name || this.props.id;
    const value = clamp(
      parseInt(this.props.value, 10) + 1,
      this.props.min,
      this.props.max
    ).toString();
    this.props.onChange({ name, value });
  };

  handleDown = () => {
    const name = this.props.name || this.props.id;
    const value = clamp(
      parseInt(this.props.value, 10) - 1,
      this.props.min,
      this.props.max
    ).toString();
    this.props.onChange({ name, value });
  };

  handleChange = ({ name, value }) => {
    const newValue = clamp(
      parseInt(value, 10),
      this.props.min,
      this.props.max
    ).toString();
    this.props.onChange({ name, value: newValue });
  };

  render() {
    return (
      <NumberWrapper>
        <StyledInput
          type="number"
          value={this.props.value}
          onChange={this.handleChange}
          aria-live="assertive"
          role="alert"
          {...this.props}
        />
        {this.props.showSpinner &&
          <SpinnerButtonWrapper>
            <SpinnerButton
              type="button"
              title={`Add ${this.props.step}`}
              onClick={this.handleUp}
              aria-controls={this.props.id}
              data-inverted
            />
            <SpinnerButton
              type="button"
              title={`Subtract ${this.props.step}`}
              onClick={this.handleDown}
              aria-controls={this.props.id}
            />
          </SpinnerButtonWrapper>}
      </NumberWrapper>
    );
  }
}

NumberInput.defaultProps = {
  showSpinner: true,
  step: 1
};

NumberInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  showSpinner: PropTypes.bool,
  value: PropTypes.string,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
};

export default NumberInput;
