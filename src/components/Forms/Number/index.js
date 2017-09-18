import React from "react";
import Input from "components/Forms/Input";
import styled from "styled-components";
import PropTypes from "prop-types";
import { clamp, isNaN } from "lodash";
import arrowIcon from "./arrow.svg";

const spinnerIconSize = "20px";

const StyledDiv = styled.div`
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
  justify-content: space-between;
`;

export const SpinnerButton = styled.button`
  border: none;
  width: ${spinnerIconSize};
  height: ${spinnerIconSize};
  background: url(${arrowIcon}) no-repeat;
  background-size: contain;
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    opacity: 1;
    transition: opacity .2s ease-in-out;
  }

  transform: scaleY(${props => (props.inverted ? -1 : 1)});
`;

class Number extends React.Component {
  handleUp = () => {
    const name = this.props.name || this.props.id;
    const value = parseInt(this.props.value, 10) + 1;
    this.handleChange({ name, value });
  };

  handleDown = () => {
    const name = this.props.name || this.props.id;
    const value = parseInt(this.props.value, 10) - 1;
    this.handleChange({ name, value });
  };

  handleChange = ({ name, value }) => {
    const enteredValue = clamp(
      parseInt(value, 10),
      this.props.min,
      this.props.max
    );

    const newValue =
      isNaN(enteredValue) || enteredValue === -0
        ? this.props.min
        : enteredValue;

    this.props.onChange({ name, value: newValue.toString() });
  };

  render() {
    return (
      <StyledDiv>
        <StyledInput
          {...this.props}
          type="number"
          onChange={this.handleChange}
          aria-live="assertive"
          role="alert"
        />
        {this.props.showSpinner &&
          <SpinnerButtonWrapper>
            <SpinnerButton
              type="button"
              title={`Add ${this.props.step}`}
              onClick={this.handleUp}
              aria-controls={this.props.id}
              inverted
            />
            <SpinnerButton
              type="button"
              title={`Subtract ${this.props.step}`}
              onClick={this.handleDown}
              aria-controls={this.props.id}
            />
          </SpinnerButtonWrapper>}
      </StyledDiv>
    );
  }
}

Number.defaultProps = {
  min: 0,
  showSpinner: true,
  step: 1
};

Number.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  showSpinner: PropTypes.bool,
  value: PropTypes.string,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number.isRequired
};

export default Number;
