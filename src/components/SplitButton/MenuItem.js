import styled from "styled-components";
import { colors } from "constants/theme";

const MenuItem = styled.button`
  border: none;
  text-align: left;
  border-radius: 0.5em;
  padding: 0.75em 1.5em;
  margin-bottom: 0.25em;
  outline: none;
  &:last-of-type {
    margin: 0;
  }

  &:focus,
  &:hover {
    background: ${colors.blue};
    color: ${colors.white};
  }
`;

export default MenuItem;
