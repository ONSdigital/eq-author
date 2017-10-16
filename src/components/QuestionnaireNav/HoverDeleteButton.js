import styled from "styled-components";
import { colors } from "constants/theme";

const HoverDeleteButton = styled.button`
  color: ${colors.text};
  border: none;
  background: transparent;
  font-size: 1.25em;
  padding: 0.125em 0.625em 0.125em 0.375em;
  position: absolute;
  right: 0;
  z-index: 3;
  cursor: pointer;
  transform: translateX(50%);
  opacity: 0;
  transition: transform 0.1s ease-in, opacity 0.1s ease-in;
`;

export default HoverDeleteButton;
