import React, { cloneElement, Component, Children } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import styled, { css } from "styled-components";
import { colors, shadow } from "constants/theme";
import { transparentize } from "polished";

const focusedStyle = css`
  box-shadow: none;
  outline-color: ${colors.lightBlue} !important;
`;

const StyledCanvasSection = styled.div`
  padding: 2em 2.5em;
  transition: outline-color 100ms ease-in;
  background: white;
  margin-bottom: 1px;
  position: relative;
  outline-width: 1px;
  outline-style: solid;
  outline-color: transparent;
  box-shadow: ${shadow};
  &:hover {
    outline-color: ${transparentize(0.6, colors.lightBlue)};
  }

  ${props => props.focused && focusedStyle};
`;

export default class CanvasSection extends Component {
  static propTypes = {
    children: PropTypes.node,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    focused: PropTypes.bool,
    answerId: PropTypes.string,
    id: PropTypes.string
  };

  static defaultProps = {
    onFocus: noop,
    onBlur: noop,
    focused: false
  };

  handleFocus = e => {
    this.props.onFocus(this.props.id);
  };

  handleBlur = e => {
    this.props.onBlur(null);
  };

  render() {
    const { children, focused, ...otherProps } = this.props;
    return (
      <StyledCanvasSection
        {...otherProps}
        onClick={this.handleFocus}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        focused={focused}
      >
        {Children.map(children, child => cloneElement(child, { focused }))}
      </StyledCanvasSection>
    );
  }
}
