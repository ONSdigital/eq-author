/* eslint-disable react/no-find-dom-node */
import React from "react";
import { findDOMNode } from "react-dom";
import Input from "components/Forms/Input";
import styled from "styled-components";
import PropTypes from "prop-types";

import arrowIcon from "./arrow.svg";

const NumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InvertedVertically = styled.img`
  -moz-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  transform: scaleY(-1);
  filter: FlipV;
  -ms-filter: "FlipV";
`;

const StyledInput = styled(Input)`
  &[type=number]::-webkit-inner-spin-button, 
  &[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      appearance: none;
      margin: 0; 
  }
  
  width: 4em;
`;

const SpinnerButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SpinnerButton = styled.button`
  border: 0;
  background: none;
`;

class NumberInput extends React.Component {
  handleUp = () => {
    const name = this.props.name || this.props.id;
    const value = (parseInt(this.numberInput.value, 10) + 1).toString();
    this.props.onChange({ name, value });
  };

  handleDown = () => {
    const name = this.props.name || this.props.id;
    const value = (parseInt(this.numberInput.value, 10) - 1).toString();
    this.props.onChange({ name, value });
  };

  handleChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  setNumberInput = input => {
    this.numberInput = findDOMNode(input);
  };

  render() {
    return (
      <NumberWrapper>
        <StyledInput
          type="number"
          value={this.props.value}
          onChange={this.handleChange}
          ref={this.setNumberInput}
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
            >
              <InvertedVertically
                src={arrowIcon}
                width="18"
                alt={`Add ${this.props.step}`}
              />
            </SpinnerButton>
            <SpinnerButton
              type="button"
              title={`Subtract ${this.props.step}`}
              onClick={this.handleDown}
              aria-controls={this.props.id}
            >
              <img
                src={arrowIcon}
                width="18"
                alt={`Subtract ${this.props.step}`}
              />
            </SpinnerButton>
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
  step: PropTypes.number
};

export default NumberInput;
