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
import { TransitionGroup } from "react-transition-group";
import PopupTransition from "./PopupTransition";

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const activeState = css`
  opacity: 1 !important;
  background-color: #f5f5f5;
`;

export const Button = styled(IconButton)`
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

export const ToolbarPanel = styled.div`
  z-index: 999;
  border-radius: ${radius};
  background-color: ${colors.white};
  box-shadow: ${shadow};
  padding: 0 0.5rem;
  display: inline-block;
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
  {
    title: "Bold",
    icon: iconBold,
    type: STYLE_INLINE,
    style: "BOLD"
  },
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

const Layer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

class ToolBar extends React.Component {
  static defaultProps = {
    bold: true,
    emphasis: true,
    heading: true,
    list: true
  };

  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    isActiveControl: PropTypes.func.isRequired,
    bold: PropTypes.bool,
    emphasis: PropTypes.bool,
    heading: PropTypes.bool,
    list: PropTypes.bool
  };

  render() {
    const { isActiveControl, onToggle, onFocus } = this.props;

    return (
      <TransitionGroup component={Layer}>
        {this.props.visible && (
          <PopupTransition duration={200}>
            <ToolbarPanel {...this.props} onFocus={onFocus}>
              <ButtonGroup>
                {buttons.map(button => (
                  <Button
                    key={button.title}
                    disabled={!this.props[button.title.toLowerCase()]}
                    active={isActiveControl(button)}
                    icon={button.icon}
                    title={button.title}
                    onClick={noop} // don't use click due to focus
                    onMouseDown={function(e) {
                      e.preventDefault(); // prevents focus on the button
                      onToggle(button);
                    }}
                  />
                ))}
              </ButtonGroup>
            </ToolbarPanel>
          </PopupTransition>
        )}
      </TransitionGroup>
    );
  }
}

export default ToolBar;
