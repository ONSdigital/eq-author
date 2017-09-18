import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { radius, colors, shadow } from "constants/theme";
import iconBold from "./icon-bold.svg";
import iconEmphasis from "./icon-emphasis.svg";
import iconHeading from "./icon-heading.svg";
import iconList from "./icon-list.svg";

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const activeState = css`
  background-color: #eee;
  color: #333;
  &:hover,
  &:focus {
    background-color: #eee;
    color: #333;
  }
`;

const Button = styled.button`
  display: block;
  padding: 0;
  border: none;
  background: transparent url(${props => props.icon}) no-repeat center;
  cursor: pointer;
  color: #6d6d6d;
  font-weight: 900;
  width: 4em;
  height: 4em;
  font-size: 0.9em;
  opacity: 0.7;
  appearance: none;
  &:hover,
  &:focus {
    background-color: #f9f9f9;
    outline: none;
    opacity: 1;
  }

  &[disabled] {
    opacity: 0.2;
    pointer-events: none;
  }

  ${props => props.active && activeState};
`;

const VisuallyHidden = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

const ToolbarPanel = styled.div`
  border-radius: ${radius};
  background-color: ${colors.white};
  box-shadow: ${shadow};
  padding: 0 0.5em;
  display: inline-block;
`;

const visible = css`
  opacity: 1;
  transform: translateY(calc(-100% - 1em));
  transition: opacity 50ms ease-in 100ms, transform 200ms ease-out;
`;

const HoveringToolbar = styled.div`
  transform: translateY(-100%);
  position: absolute;
  opacity: 0;
  transition: opacity 50ms ease-in, transform 200ms ease-out;
  ${props => props.visible && visible};
`;

export const STYLE_BLOCK = "block";
export const STYLE_INLINE = "inline";

const buttons = [
  {
    name: "heading",
    icon: iconHeading,
    type: STYLE_BLOCK,
    style: "header-two"
  },
  {
    name: "list",
    icon: iconList,
    type: STYLE_BLOCK,
    style: "unordered-list-item"
  },
  { name: "bold", icon: iconBold, type: STYLE_INLINE, style: "BOLD" },
  {
    name: "emphasis",
    icon: iconEmphasis,
    type: STYLE_INLINE,
    style: "emphasis"
  }
];

class ToolBar extends React.Component {
  state = {
    visible: false
  };

  static defaultProps = {
    bold: true,
    emphasis: true,
    heading: true,
    list: true
  };

  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    active: PropTypes.func.isRequired,
    bold: PropTypes.bool,
    emphasis: PropTypes.bool,
    heading: PropTypes.bool,
    list: PropTypes.bool
  };

  componentWillReceiveProps({ visible }) {
    this.setState({ visible });
  }

  handleFocus = () => {
    this.setState({ visible: true });
  };

  render() {
    const { active, onToggle } = this.props;

    return (
      <HoveringToolbar visible={this.state.visible}>
        <ToolbarPanel {...this.props} onFocus={this.handleFocus}>
          <ButtonGroup>
            {buttons.map(button => {
              const disabled = !this.props[button.name];
              return (
                <Button
                  key={button.name}
                  disabled={disabled}
                  active={active(button)}
                  icon={button.icon}
                  onMouseDown={function(e) {
                    e.preventDefault();
                    if (!disabled) {
                      onToggle(button);
                    }
                  }}
                >
                  <VisuallyHidden>
                    {button.name}
                  </VisuallyHidden>
                </Button>
              );
            })}
          </ButtonGroup>
        </ToolbarPanel>
      </HoveringToolbar>
    );
  }
}

export default ToolBar;
