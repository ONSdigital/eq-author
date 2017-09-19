import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { noop } from "lodash";

import { radius, colors, shadow } from "constants/theme";
import iconBold from "./icon-bold.svg";
import iconEmphasis from "./icon-emphasis.svg";
import iconHeading from "./icon-heading.svg";
import iconList from "./icon-list.svg";
import IconButton from "components/IconButton";

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const activeState = css`
  opacity: 1 !important;
  background-color: #f5f5f5;
`;

const Button = styled(IconButton)`
  display: block;
  opacity: 0.7;
  &:hover,
  &:focus {
    background-color: #f5f5f5;
    outline: none;
    opacity: 0.8;
  }

  &[disabled] {
    opacity: 0.2;
    pointer-events: none;
  }

  ${props => props.active && activeState};
`;

const ToolbarPanel = styled.div`
  border-radius: ${radius};
  background-color: ${colors.white};
  box-shadow: ${shadow};
  padding: 0 0.5rem;
  display: inline-block;
`;

const visible = css`
  opacity: 1;
  transform: translateY(-120%) scale(1);
  transition: opacity 50ms ease-in,
    transform 200ms cubic-bezier(0.175, 0.885, 0.32, 1.4);
  pointer-events: all;
`;

const HoveringToolbar = styled.div`
  pointer-events: none;
  transform: translateY(-80%) scale(0.6);
  position: absolute;
  z-index: 999;
  opacity: 0.01;
  transition: opacity 50ms ease-in, transform 200ms ease-in;
  ${props => props.visible && visible};
`;

export const STYLE_BLOCK = "block";
export const STYLE_INLINE = "inline";

const buttons = [
  {
    title: "Heading",
    icon: iconHeading,
    type: STYLE_BLOCK,
    style: "header-two"
  },
  { title: "Bold", icon: iconBold, type: STYLE_INLINE, style: "BOLD" },
  {
    title: "Emphasis",
    icon: iconEmphasis,
    type: STYLE_INLINE,
    style: "emphasis"
  },
  {
    title: "List",
    icon: iconList,
    type: STYLE_BLOCK,
    style: "unordered-list-item"
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
            {buttons.map(button => (
              <Button
                key={button.title}
                disabled={!this.props[button.title.toLowerCase()]}
                active={active(button)}
                icon={button.icon}
                title={button.title}
                onClick={noop} // don't use click due to focus reason
                onMouseDown={function(e) {
                  e.preventDefault(); // prevents focus on the button
                  onToggle(button);
                }}
              />
            ))}
          </ButtonGroup>
        </ToolbarPanel>
      </HoveringToolbar>
    );
  }
}

export default ToolBar;
