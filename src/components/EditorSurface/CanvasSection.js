import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { colors, shadow } from "constants/theme";
import { transparentize } from "polished";

const focusedStyle = css`
  box-shadow: none;
  outline-color: ${colors.lightBlue} !important;
`;

export const BasicSection = styled.div`
  padding: 2em 2.5em;
  background-color: white;
  position: relative;
  box-shadow: ${shadow};
`;

const FocusableSection = styled(BasicSection)`
  transition: outline-color 100ms ease-in;
  margin-bottom: 1px;
  outline: 1px solid transparent;
  ${props => props.isFocused && focusedStyle};

  &:hover {
    outline-color: ${transparentize(0.6, colors.lightBlue)};
  }
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
      <FocusableSection
        {...this.props}
        onClick={this.handleFocus}
        onFocus={this.handleFocus}
      />
    );
  }
}
