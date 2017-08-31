import React from "react";
import Input from "components/Forms/Input";
import styled from "styled-components";

import arrowIcon from "./arrow.svg";

const NumericWrapper = styled.div`
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

const StyledNumeric = styled(Input)`
  &[type=number]::-webkit-inner-spin-button, 
  &[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0; 
  }
  
  width: 4em;
`;

const NumericButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumericButton = styled.button`
  border: 0;
  background: none;
`;

class NumberInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
  }

  componentWillMount = () => {
    if (this.props.value) {
      this.setState({
        value: parseInt(this.props.value, 10).toString()
      });
    }
  };

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

  handleChange = ({ value }) => {
    this.setState({
      value: parseInt(value, 10).toString()
    });
  };

  render(props) {
    return (
      <NumericWrapper>
        <StyledNumeric
          type="number"
          value={this.state.value}
          onChange={this.handleChange}
          {...props}
        />
        <NumericButtons>
          <NumericButton type="button" onClick={this.handleUp}>
            <InvertedVertically src={arrowIcon} width="18" />
          </NumericButton>
          <NumericButton type="button" onClick={this.handleDown}>
            <img src={arrowIcon} width="18" />
          </NumericButton>
        </NumericButtons>
      </NumericWrapper>
    );
  }
}

export default NumberInput;
