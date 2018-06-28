import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";
import { Input } from "components/Forms";
import { colors } from "constants/theme";

const knobColors = {
  off: colors.white,
  on: colors.white
};

const backgroundColors = {
  on: colors.blue,
  off: colors.white
};

const knobBorder = {
  on: `none`,
  off: `1px solid ${colors.borders}`
};

const backgroundBorder = {
  on: `none`,
  off: `0.1em solid ${colors.borders}`
};

const SharedDefaultProps = {
  width: 1.7,
  height: 1.15
};

const glowScale = 1.4;

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
  border: ${props =>
    props.checked ? backgroundBorder.on : backgroundBorder.off};
`;

ToggleSwitchBackground.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

ToggleSwitchBackground.defaultProps = SharedDefaultProps;

const ToggleSwitchKnob = styled.div`
  display: inline-block;
  height: ${props => (props.checked ? props.size - 0.1 : props.size + 0.1)}em;
  width: ${props => (props.checked ? props.size - 0.1 : props.size + 0.1)}em;
  background: ${props => (props.checked ? knobColors.on : knobColors.off)};
  content: "";
  position: relative;
  top: ${props => (props.checked ? 0.15 : -0.025)}em;
  right: 0.05em;
  will-change: transform;
  transform: translateX(
    ${props => (props.checked ? props.width - props.size : 0)}em
  );
  border-radius: 50%;
  transition: transform 100ms ease-in-out;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.24);
  border: ${props => (props.checked ? knobBorder.on : knobBorder.off)};
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
  /* stylelint-disable declaration-block-semicolon-newline-after */
  ${HiddenInput}:focus + ${ToggleSwitchBackground} &::before {
    opacity: 0.12;
  }
  /* stylelint-enable */
`;

ToggleSwitchKnob.propTypes = {
  size: PropTypes.number
};

ToggleSwitchKnob.defaultProps = {
  size: 0.9,
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
