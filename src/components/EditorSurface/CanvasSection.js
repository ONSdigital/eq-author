import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { colors, shadow } from "constants/theme";
import withUIState from "containers/enhancers/withUIState";

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
`;

export class CanvasSection extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    focusOnSection: PropTypes.func.isRequired,
    selectedSection: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  };

  handleFocus = () => this.props.focusOnSection(this.props.id);

  render() {
    const { selectedSection, id } = this.props;
    return (
      <FocusableSection
        {...this.props}
        onFocus={this.handleFocus}
        isFocused={selectedSection === id}
      />
    );
  }
}

export default withUIState(CanvasSection);
