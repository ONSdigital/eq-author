import React from "react";
import Input from "components/Forms/Input";
import styled from "styled-components";
import PropTypes from "prop-types";
import { clamp, isNaN } from "lodash";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled(Input)`
  width: 4em;

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  &[type="number"] {
    appearance: textfield;
  }
`;

class Number extends React.Component {
  handleUp = () => {
    const name = this.props.name || this.props.id;
    const value = this.props.value + 1;
    this.handleChange({ name, value });
  };

  handleDown = () => {
    const name = this.props.name || this.props.id;
    const value = this.props.value - 1;
    this.handleChange({ name, value });
  };

  handleChange = ({ name, value }) => {
    const enteredValue = clamp(
      parseInt(value, 10),
      this.props.min,
      this.props.max
    );
    /* eslint-disable no-compare-neg-zero */
    const newValue =
      isNaN(enteredValue) || enteredValue === -0
        ? this.props.min
        : enteredValue;

    this.props.onChange({ name, value: newValue });
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
      </StyledDiv>
    );
  }
}

Number.defaultProps = {
  min: 0,
  step: 1
};

Number.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number.isRequired
};

export default Number;
