import React from "react";
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
      -moz-appearance: none;
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
  constructor() {
    super();
    this.state = {
      value: "0"
    };
  }

  componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({
        value: this.props.defaultValue.toString()
      });
    }
  }

  handleUp = () => {
    const newValue = parseInt(this.state.value, 10) + 1;
    this.setState({
      value: newValue.toString()
    });
  };

  handleDown = () => {
    const newValue = parseInt(this.state.value, 10) - 1;
    this.setState({
      value: newValue.toString()
    });
  };

  handleChange = e => {
    this.setState({
      value: e.value.toString()
    });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    return (
      <NumberWrapper>
        <StyledInput
          type="number"
          value={this.state.value}
          onChange={this.handleChange}
          {...this.props}
        />
        {this.props.showSpinner &&
          <SpinnerButtonWrapper>
            <SpinnerButton type="button" onClick={this.handleUp}>
              <InvertedVertically src={arrowIcon} width="18" alt="Increase" />
            </SpinnerButton>
            <SpinnerButton type="button" onClick={this.handleDown}>
              <img src={arrowIcon} width="18" alt="Decrease" />
            </SpinnerButton>
          </SpinnerButtonWrapper>}
      </NumberWrapper>
    );
  }
}

NumberInput.defaultProps = {
  showSpinner: true
};

NumberInput.propTypes = {
  onChange: PropTypes.func,
  showSpinner: PropTypes.bool,
  defaultValue: PropTypes.number
};

export default NumberInput;
