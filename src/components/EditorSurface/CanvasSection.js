import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { rgba } from "polished";

import { colors, shadow } from "constants/theme";
import * as ActionCreators from "redux/uiState/actions";
import { getSelectedSection } from "redux/uiState/reducer";

const focusedStyle = css`
  box-shadow: none;
  outline-color: ${colors.blue} !important;
`;

export const BasicSection = styled.div`
  padding: 2em 2.5em;
  background-color: white;
  position: relative;
  box-shadow: ${shadow};
  margin-bottom: 1em !important;
`;

const FocusableSection = styled(BasicSection)`
  transition: outline-color 100ms ease-in;
  margin-bottom: 1px;
  outline: 1px solid transparent;
  ${props => props.isFocused && focusedStyle};

  &:hover {
    outline-color: ${rgba(colors.blue, 0.5)};
  }
`;

export class CanvasSection extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    focusOnSection: PropTypes.func.isRequired,
    isFocused: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
  };

  handleFocus = e => this.props.focusOnSection(this.props.id);

  render() {
    return <FocusableSection {...this.props} onFocus={this.handleFocus} />;
  }
}

const mapStateToProps = ({ uiState }, { id }) => ({
  isFocused: getSelectedSection(uiState) === id
});

export default connect(mapStateToProps, ActionCreators)(CanvasSection);
