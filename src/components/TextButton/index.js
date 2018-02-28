import styled from "styled-components";
import { radius, colors } from "constants/theme";
import { darken } from "polished";

const darken10 = darken(0.1);

const TextButton = styled.button`
  cursor: pointer;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  transition: border-color 200ms ease-out;
  text-transform: uppercase;
  font-weight: 600;
  color: ${colors.blue};
  border: 1px solid transparent;
  border-radius: ${radius};
  font-size: 0.85em;
  padding: 0.5em 0.75em;
  letter-spacing: 0.05em;

  &:focus,
  &:active {
    outline-width: 0;
  }

  &[disabled] {
    pointer-events: none;
    color: grey;
  }

  &:hover {
    color: ${darken10(colors.blue)};
  }

  &:focus {
    border-color: ${colors.blue};
  }
`;

export default TextButton;
