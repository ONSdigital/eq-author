import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";
import { Input } from "components/Forms";
import { colors } from "constants/theme";

const knobColors = {
  off: "#E8E8E8",
  on: colors.blue
};

const backgroundColors = {
  on: "#78C3E9",
  off: "#c3c3c3"
};

const SharedDefaultProps = {
  width: 2.6,
  height: 1
};

const glowScale = 1.5;

export const HiddenInput = styled(Input)`
  opacity: 0;
  position: absolute;

  &:focus {
    border: none;
  }
`;

export const ToggleSwitchBackground = styled.div`
  cursor: pointer;
  height: ${props => props.height}em;
  width: ${props => props.width}em;
  background: ${props =>
    props.checked ? backgroundColors.on : backgroundColors.off};
  border-radius: 1em;
  content: "";
  transition: background 100ms ease-in-out;
  position: relative;
`;

ToggleSwitchBackground.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

ToggleSwitchBackground.defaultProps = SharedDefaultProps;

const ToggleSwitchKnob = styled.div`
  display: inline-block;
  height: ${props => props.size}em;
  width: ${props => props.size}em;
  background: ${props => (props.checked ? knobColors.on : knobColors.off)};
  content: "";
  position: relative;
  top: ${props => -((props.size - props.height) / 2)}em;
  will-change: transform;
  transform: translateX(
    ${props => (props.checked ? props.width - props.size : 0)}em
  );
  border-radius: 50%;
  transition: transform 100ms ease-in-out;
  /* stylelint-disable */
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.24);
  /* stylelint-enable */

  &::before {
    background: ${knobColors.on};
    display: inline-block;
    content: "";
    width: ${props => props.size * glowScale}em;
    height: ${props => props.size * glowScale}em;
    position: relative;
    top: ${props => -((props.size * glowScale - props.size) / 2)}em;
    will-change: transform;
    transform: translateX(
      ${props => -((props.size * glowScale - props.size) / 2)}em
    );
    border-radius: 50%;
    opacity: 0;
    transition: opacity 100ms ease-in-out;
  }

  /* stylelint-disable */
  ${HiddenInput}:focus + ${ToggleSwitchBackground} &::before {
    /* stylelint-enable */
    opacity: 0.12;
  }
`;

ToggleSwitchKnob.propTypes = {
  size: PropTypes.number
};

ToggleSwitchKnob.defaultProps = {
  size: 1.4,
  ...SharedDefaultProps
};

const FlexInline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: ${props => props.width}em;
  position: relative;
`;

FlexInline.propTypes = {
  width: PropTypes.number
};

FlexInline.defaultProps = SharedDefaultProps;

class ToggleSwitch extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    size: PropTypes.number
  };

  static defaultProps = {
    checked: false
  };

  constructor(props) {
    super(props);
    this.id = this.props.id || this.generateUniqueId();
  }

  generateUniqueId = () => {
    return uniqueId("toggle-");
  };

  handleToggle = () => {
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this.hiddenInput).focus();
    this.props.onChange({
      name: this.id,
      value: !this.props.checked
    });
  };

  inputRef = input => {
    this.hiddenInput = input;
  };

  render() {
    const { checked, onChange, width, height, size } = this.props;
    return (
      <FlexInline role="switch" aria-checked={checked} width={width}>
        <HiddenInput
          id={this.id}
          type="checkbox"
          onChange={onChange}
          checked={checked}
          ref={this.inputRef}
        />
        <ToggleSwitchBackground
          role="presentation"
          checked={checked}
          onClick={this.handleToggle}
          width={width}
          height={height}
        >
          <ToggleSwitchKnob
            checked={checked}
            width={width}
            height={height}
            size={size}
          />
        </ToggleSwitchBackground>
      </FlexInline>
    );
  }
}

export default ToggleSwitch;
