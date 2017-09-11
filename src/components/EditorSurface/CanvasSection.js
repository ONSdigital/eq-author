import React from "react";
import PropTypes from "prop-types";
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
  ${props => props.isFocused && focusedStyle};
`;

export default class CanvasSection extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onFocus: PropTypes.func.isRequired,
    isFocused: PropTypes.bool,
    id: PropTypes.string.isRequired
  };

  static defaultProps = {
    isFocused: false
  };

  handleFocus = () => {
    this.props.onFocus(this.props.id);
  };

  render() {
    return (
      <StyledCanvasSection
        {...this.props}
        onClick={this.handleFocus}
        onFocus={this.handleFocus}
      />
    );
  }
}
