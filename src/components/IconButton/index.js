import styled from "styled-components";
import Button from "components/Button";
import { colors } from "constants/theme";

const IconButton = styled(Button).attrs({
  type: "button"
})`
  display: flex;
  align-items: center;

  & svg {
    margin-right: 1em;
  }

   &:hover,
   &:focus {
    color: ${colors.highlight};
  }

  &:hover svg path,
  &:focus svg path {
    fill: ${colors.highlight};
  }
`;

export default IconButton;
