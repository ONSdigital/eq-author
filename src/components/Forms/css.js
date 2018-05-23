import { css } from "styled-components";
import { colors, radius } from "constants/theme";
import { darken } from "polished";

export const sharedStyles = css`
  padding: 0.7em;
  width: 100%;
  display: block;
  border-radius: ${radius};
  border: 1px solid ${colors.borders};
  font-size: 1em;

  &:hover {
    border-color: ${darken(0.1)(colors.borders)};
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }
`;
