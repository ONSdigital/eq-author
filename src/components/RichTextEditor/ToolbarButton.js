import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { colors } from "constants/theme";

const activeState = css`
  opacity: 1 !important;
  background-color: ${colors.blue};
  svg * {
    fill: ${colors.white};
  }
`;

const ToolbarButton = styled.button.attrs({ type: "button" })`
  display: block;
  opacity: 0.7;
  padding: 0;
  border: none;
  font-size: 1rem;
  margin: 0;

  svg {
    vertical-align: middle;
  }

  &:hover {
    background-color: ${colors.blue};
    outline: none;

    svg * {
      fill: ${colors.white};
    }
  }

  &:focus {
    outline: 3px solid ${colors.highlight};
    outline-offset: -3px;
  }

  &[disabled] {
    opacity: 0.2;
    pointer-events: none;
  }

  ${props => props.active && activeState};
`;

ToolbarButton.propTypes = {
  active: PropTypes.bool
};

export default ToolbarButton;
