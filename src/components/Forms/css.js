import { css } from "styled-components";
import { colors, radius } from "constants/theme";

export const sharedStyles = css`
  padding: 0.7em;
  width: 100%;
  display: block;
  border-radius: ${radius};
  border: 1px solid ${colors.borders};
  font-size: 0.9em;
  &:focus {
    outline: none;
    border: 1px solid ${colors.lightBlue};
  }
`;
