import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { noop } from "lodash";
import { TransitionGroup } from "react-transition-group";
import PopupTransition from "./PopupTransition";

import { radius, colors, shadow } from "constants/theme";
import iconBold from "./icon-bold.svg?inline";
import iconEmphasis from "./icon-emphasis.svg?inline";
import iconHeading from "./icon-heading.svg?inline";
import iconList from "./icon-list.svg?inline";
import IconButton from "components/IconButton";
import PipingMenu from "./PipingMenu";

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const Separator = styled.div`
  width: 1px;
  border-left: 1px solid ${colors.borders};
  margin: 0.25rem;
`;

const activeState = css`
  opacity: 1 !important;
  background-color: ${colors.lighterGrey};
`;

export const Button = styled(IconButton)`
  display: block;
  opacity: 0.7;

  &:hover,
  &:focus {
    background-color: ${colors.lighterGrey};
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
  border-radius: ${radius};
  background-color: ${colors.white};
  box-shadow: ${shadow};
  padding: 0 0.5rem;
  display: inline-block;
  pointer-events: auto;
`;

export const STYLE_BLOCK = "block";
export const STYLE_INLINE = "inline";

export const buttons = [
  {
    id: "heading",
    title: "Heading",
    icon: iconHeading,
    type: STYLE_BLOCK,
    style: "header-two"
  },
  {
    id: "bold",
    title: "Bold",
    icon: iconBold,
    type: STYLE_INLINE,
    style: "BOLD"
  },
  {
    id: "emphasis",
    title: "Emphasis",
    icon: iconEmphasis,
    type: STYLE_INLINE,
    style: "ITALIC"
  },
  {
    id: "list",
    title: "List",
    icon: iconList,
    type: STYLE_BLOCK,
    style: "unordered-list-item"
  }
];

const Layer = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  pointer-events: none;
`;

class ToolBar extends React.Component {
  static defaultProps = {
    controls: {},
    visible: false
  };

  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    onPiping: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    isActiveControl: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    selectionIsCollapsed: PropTypes.bool.isRequired,
    controls: PropTypes.shape({
      bold: PropTypes.bool,
      emphasis: PropTypes.bool,
      heading: PropTypes.bool,
      list: PropTypes.bool,
      piping: PropTypes.bool
    })
  };

  renderButton = button => {
    const { isActiveControl, onToggle, controls } = this.props;

    return (
      <Button
        iconOnly
        highlightOnHover={false}
        key={button.title}
        disabled={!controls[button.id]}
        active={isActiveControl(button)}
        icon={button.icon}
        onClick={noop} // don't use click due to focus
        onMouseDown={function(e) {
          e.preventDefault(); // prevents focus on the button
          if (e.button === 0) {
            // left mouse button
            onToggle(button);
          }
        }}
        onKeyDown={function(e) {
          if (e.key === "Enter" || e.key === "Space") {
            onToggle(button);
          }
        }}
      >
        {button.title}
      </Button>
    );
  };

  render() {
    const {
      visible,
      onFocus,
      onBlur,
      onPiping,
      selectionIsCollapsed,
      controls: { piping }
    } = this.props;

    const isPipingDisabled = !(piping && selectionIsCollapsed);

    return (
      <TransitionGroup component={Layer}>
        {visible && (
          <PopupTransition duration={200}>
            <ToolbarPanel onFocus={onFocus} onBlur={onBlur}>
              <ButtonGroup>
                <PipingMenu
                  disabled={isPipingDisabled}
                  onItemChosen={onPiping}
                />
                <Separator />
                {buttons.map(this.renderButton)}
              </ButtonGroup>
            </ToolbarPanel>
          </PopupTransition>
        )}
      </TransitionGroup>
    );
  }
}

export default ToolBar;
