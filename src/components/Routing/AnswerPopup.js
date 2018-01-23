import React from "react";
import enhanceWithClickOutside from "react-click-outside";
import { colors, shadow, radius } from "constants/theme";
import styled, { css, keyframes } from "styled-components";

import iconError from "./icon-error.svg";
import TextBtn from "./TextBtn";

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-3px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(3px, 0, 0);
  }
`;

const shakey = css`
  animation: ${shake} 0.75s ease-in-out;
`;

const invalid = css`
  &::before {
    background-color: ${colors.red};
    width: 4px;
  }
`;

const Popup = styled.div`
  border-radius: ${radius};
  background-color: ${colors.white};
  box-shadow: ${shadow};
  border-bottom: 1px solid #ddd;
  padding: 1.5em 1.5em 1em;
  position: absolute;
  width: 18em;
  z-index: 9999;
  display: flex;
  border-top: 1px solid #f3f1f1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &::before {
    transition: all 100ms ease-in;
    content: "";
    position: absolute;
    background-color: #fff;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0px;
    height: 100%;
  }
  ${props => !props.valid && invalid};
  ${state => state.shakey && shakey};
`;

const PopupBody = styled.div`
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
`;

const PopupFooter = styled.div`
  display: flex;
`;

const ValidationMsg = styled.div`
  display: flex;
  color: ${colors.red};
  align-items: center;
  font-size: 0.8em;
`;

const DoneBtn = styled(TextBtn)`
  align-self: flex-end;
  margin-left: auto;
`;

class AnswerPopup extends React.Component {
  state = {
    shakey: false
  };

  // componentWillReceiveProps({ valid }) {
  //   if (this.props.valid) {
  //     this.setState({ shakey: !valid });
  //   }
  // }

  handleClickOutside(e) {
    this.props.onCancel();
  }

  handleDoneClick = e => {
    this.props.onDone();
    if (!this.props.valid) {
      this.setState({
        shakey: true
      });
    }
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.onDone();
    } else if (e.keyCode === 27) {
      this.props.onCancel();
    }
  };

  render() {
    return (
      <Popup
        onKeyDown={this.handleKeyDown}
        style={{ ...this.props.position }}
        valid={this.props.valid}
        shakey={this.state.shakey}
        onAnimationEnd={e => this.setState({ shakey: false })}
      >
        <PopupBody>{this.props.children}</PopupBody>
        <PopupFooter>
          {!this.props.valid && (
            <ValidationMsg>
              <img src={iconError} alt="" style={{ marginRight: "0.5em" }} />
              {this.props.validationError}
            </ValidationMsg>
          )}
          <DoneBtn onClick={this.handleDoneClick}>DONE</DoneBtn>
        </PopupFooter>
      </Popup>
    );
  }
}

AnswerPopup.defaultProps = {
  valid: true
};

export default enhanceWithClickOutside(AnswerPopup);
